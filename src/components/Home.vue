<template>
  <div>
    <full-image/>
    <swiper :height="screenHeight" :show-dots="false" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
      <swiper-item>
        <v-touch tag="div" v-on:swipeleft="audioPlayer" v-on:tap="audioPlayer" class="home">
          <div class="clock">
            {{now}}
          </div>
          <div class="days">
            {{today}}
          </div>

          <div v-show="showMessage" class="message">
            <transition name="v-transition" enter-active-class="animated slideInLeft">
              <img v-show="showMessage" class="avatar" src="http://cbpm.sinaapp.com/cdn/static/img/logo.jpg">
            </transition>
            <transition name="v-transition" enter-active-class="animated slideInRight">
              <div v-show="showMessage" class="info">
                欢迎来到品质成钞两周年庆，
                <x-button mini plain class="button-primary-white" @click.native="viewLucky">点击此处</x-button>查看幸运楼层。</div>
            </transition>
          </div>

          <div class="tips">向左滑动加入留言</div>
        </v-touch>
      </swiper-item>
      <swiper-item>
        <div class="box" ref="chatBox" :style="{'max-height':chatHeight}">

          <div class="message">
            <img class="avatar" :src="welcome.headimgurl">
            <div class="content align-left">
              <p class="user">{{welcome.nickname}} ({{welcome.province}}{{welcome.city}})</p>
              <div class="bubble bubble_default left">
                <p>Hello {{welcome.welUser}},终于等到你啦！</p>
              </div>
            </div>
          </div>

          <transition-group enter-active-class="animated zoomIn">
            <div v-for="(item,floors) in comments" :key="floors" class="message" :class="{me:item.isMe}">
              <img class="avatar" :src="item.headimgurl">
              <div class="content" :class="{'align-right':item.isMe,'align-left':!item.isMe}">
                <p class="user" :class="{me:item.isMe}">{{item.nickname}} ({{item.province}}{{item.city}}) <span v-if="item.id&&item.isMe">#{{item.id}}</span></p>
                <div class="bubble bubble_default" :class="{right:item.isMe,left:!item.isMe,bubble_primary:item.isMe,emoji:item.emoji}">
                  <p v-html="item.content"></p>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="dialog-footer" v-if="commentsNum<2">
          <div class="component-dialogue-bar-person">
            <div class="chat-way">
              <input type="text" :placeholder="'您还剩'+Math.max(0,2-commentsNum)+'次机会'" class="chat-txt" v-model.trim="myChat" @keyup.enter="sendComment">
            </div>
            <x-button type="primary" :disabled="commentsNum>=2 || myChat==''" mini class="send" @click.native="sendComment">发送</x-button>
          </div>
        </div>
      </swiper-item>
    </swiper>

    <toast v-model="toast.show">{{ toast.msg }}</toast>

    <div v-show="showArrow" class="iSlider-arrow-right iSlider-arrow-white-right"></div>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem,
    XInput,
    XButton,
    Toast
  } from 'vux'

  import {
    dateFormat,
    numberComma
  } from 'vux'

  import {
    mapState,
    mapMutations
  } from 'vuex'

  import FullImage from '@/components/IFullImage/index'
  import '../assets/css/arrow.css';
  import '../assets/css/wechat.css';
  import 'animate.css';
  import defaultMessage from '../assets/data/defaultData.json';

  let bannedList = ['近平','西藏','新疆','独立','SB','达赖','你妈','操','傻逼','煞笔','妈蛋','共产党','法轮','公安']

  export default {
    components: {
      Swiper,
      SwiperItem,
      XInput,
      XButton,
      Toast,
      FullImage
    },
    data() {
      return {
        now: '00:00',
        swiperItemIndex: 0,
        myChat: '',
        comments: [],
        showMessage: false,
        curid: {
          min: 0,
          max: 0,
        },
        welcome: {
          nickname: '品质成钞',
          province: '成都',
          city: '温江',
          headimgurl: 'http://cbpm.sinaapp.com/cdn/static/img/logo.jpg',
          isMe: 0
        },
        toast: {
          show: false,
          msg: ''
        },
        startGetData: false,
        isInited: false,
        intervalTicket: '',
        commentsNum: 0,
        chatHeight: window.innerHeight + 'px'
      }
    },
    computed: {
      ...mapState(['showArrow', 'userInfo', 'cdnUrl', 'closeMusic']),
      mute: {
        get() {
          return this.$store.state.mute;
        },
        set(val) {
          this.muteSound(val);
        }
      },
      today() {
        return dateFormat(new Date(), 'M月D日 星期E');
      },
      screenWidth() {
        return (window.innerWidth - 30) + 'px';
      },
      screenHeight() {
        return window.innerHeight + 'px';
      },
      chatContainer() {
        return this.$refs['chatBox'];
      },
      url() {
        return window.location.href.split('#')[0]; // 'http://localhost:8000'
      }
    },
    watch: {
      "userInfo.nickname" (val) {
        this.initWelInfo();
      },
      startGetData(val) {
        if (val) {
          this.loadCommentByTime();
        }
      },
      comments() {
        this.$nextTick(() => {
          this.scrollToBottom();
        })
      },
      commentsNum() {
        this.getChatHeight();
      },
      myChat(val) {
        if (val.length == 0) {
          return;
        }
        let needBaned = false;
        bannedList.forEach(item=>{
          if(val.replace(/ /g,'').includes(item)){
            needBaned = true;
          }
        })
        if (needBaned) {
          this.toast.show = true;
          this.toast.msg = '你这是要干嘛？'
          this.myChat = '';
        }
      }
    },
    methods: {
      ...mapMutations(['muteSound']),
      getChatHeight() {
        // 窗体高度，底部高度，底部留白
        let offset = (this.commentsNum < 2) ? 65 : 0;
        this.chatHeight = (window.innerHeight - offset) + 'px';
      },
      audioPlayer() {
        if (!this.closeMusic && this.mute) {
          this.mute = false;
        }
      },
      getDefaultSetting() {
        return {
          nickname: '品质成钞',
          province: '成都',
          city: '温江',
          headimgurl: 'http://cbpm.sinaapp.com/cdn/static/img/logo.jpg',
          isMe: 0,
          emoji: false
        };
      },
      initWelInfo() {
        Object.assign(this.welcome, {
          welUser: this.userInfo.nickname,
        })

        let defaultTime = 100;
        this.loadDefaultMessage({
          content: `今天是${dateFormat(new Date(), 'YYYY年M月D日')}，“品质成钞”微信成立两周年啦。钞人贝贝收到了五湖四海的祝福。`
        }, defaultTime += 2000);

        this.loadDefaultMessage({
          content: `<img src="http://cbpm.sinaapp.com/cdn/static/img/beibei.gif" style="width:80px;height:80px;"></img>`,
          emoji: true
        }, defaultTime += 2000);

        defaultTime += 2000;
        // 用户ABCD留言
        for (let i = 0; i < defaultMessage.length; i++) {
          setTimeout(() => {
            this.comments.push(defaultMessage[i]);
          }, defaultTime + i * 6000);
        }
        this.loadDefaultMessage({
          content: `你要不要也来说两句？`,
        }, defaultTime += 6000 * defaultMessage.length);

        this.loadDefaultMessage({
          content: `呃……我能说些什么呢?`,
          nickname: this.userInfo.nickname,
          province: this.userInfo.province,
          city: this.userInfo.city,
          headimgurl: this.userInfo.headimgurl,
          isMe: true,
        }, defaultTime += 2000);

        this.loadDefaultMessage({
          content: `如果你是老粉丝，可以聊聊你喜欢的一期品质成钞微信或者给我们提建议，如果你是新粉丝，就给我们留言送祝福吧。既然来了都是客，快来留言吧！`,
        }, defaultTime += 2000);

        setTimeout(() => {
          this.startGetData = true;
        }, defaultTime + 4000);
      },
      loadDefaultMessage(settings, waiting = 100) {
        if (!Reflect.get(settings, 'emoji')) {
          settings.emoji = false;
        }
        setTimeout(() => {
          this.comments.push(Object.assign(this.getDefaultSetting(), settings));
        }, waiting);
      },
      refreshTime() {
        setInterval(() => {
          this.now = dateFormat(new Date(), 'HH:mm');
        }, 1000);
      },
      onSwiperItemIndexChange(index) {
        this.$store.commit('hideArrow', index == 0);
        if (index == 0) {
          document.title = '';
        } else {
          document.title = '品质成钞两周年';
        }

        // 首次载入时弹出消息
        if (this.isInited) {
          return;
        }
        if (index == 1) {
          this.isInited = true;
          this.initWelInfo();
        }
      },
      getSubmitData() {
        return {
          nickname: this.userInfo.nickname,
          openid: this.userInfo.openid,
          sex: this.userInfo.sex,
          city: this.userInfo.city,
          province: this.userInfo.province,
          country: this.userInfo.country,
          headimgurl: this.userInfo.headimgurl,
          content: this.myChat,
          needhide: 0,
          rec_time: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        };
      },
      sendComment() {
        this.submitComment();
      },
      submitComment() {
        let params = this.getSubmitData();

        params.s = '/addon/Api/Api/setUserComment';

        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res => {
          this.toast.show = true;
          this.toast.msg = res.data.msg;
          this.myChat = '';
          this.commentsNum++;
        });
      },
      scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      },
      viewLucky() {
        this.$router.push('lucky');
      },
      loadMoreComment() {
        let params = {
          s: '/addon/Api/Api/getUserCommentInChat',
          curid: this.curid.max,
          type: 0 // 载入新数据
        }

        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res => {
          let newComment = res.data;
          if (newComment.length == 0) {
            return;
          }
          newComment.sort((a, b) => a.id - b.id).map(item => {
            item.isMe = (item.openid == this.userInfo.openid);
            return item;
          })
          // 更新ID值用于向前向后加载
          this.curid.max = newComment[newComment.length - 1].id;
          if (this.curid.min > 0) {
            this.curid.min = Math.min(newComment[0].id, this.curid.min);
          } else {
            this.curid.min = newComment[0].id;
          }

          this.comments = [...this.comments, ...newComment];
        });
      },
      loadCommentByTime() {
        this.loadMoreComment();
        // 3秒更新数据
        this.intervalTicket = setInterval(() => {
          this.loadMoreComment();
        }, 3000);
      },
      getMyCommentsNum() {
        let params = {
          s: '/addon/Api/Api/getMyCommentsNum',
          openid: this.userInfo.openid
        }
        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res => {
          this.commentsNum = res.data[0].num;
        })
      },
      init() {
        setTimeout(() => {
          this.showMessage = true;
        }, 500);
      }
    },
    mounted() {
      this.init();
      this.getMyCommentsNum();
    },
    created() {
      this.refreshTime();
      document.title = '';
    },
    beforeRouteLeave(to, from, next) {
      if (this.intervalTicket) {
        clearInterval(this.intervalTicket);
      }
      next();
    }
  }

</script>

<style scoped lang="less">
  @white: #fff;
  .home {
    margin-top: 10%;
    height: 100%;
    text-align: center;
    color: @white;
    font-weight: 100;
    .clock {
      font-size: 50pt;
    }
    .days {
      font-size: 12pt;
      margin-top: -5px;
    }
    .message {
      margin-top: 20%; // padding: 10px 20px 10px 10px;
      display: flex;
      align-items: center;
      text-align: left;
      background: rgba(0, 0, 0, 0.5);
      font-size: 12pt;
      width: 100%;
      padding: 10px 0;
      .button-primary-white {
        color: @white;
        border-color: #aaa;
        margin: 0 5px;
        padding: 0 5px;
      }
      .weui-btn_default:not(.weui-btn_disabled):active {
        background-color: rgba(255, 255, 255, 0.2);
      } // .info {
      //   float: right;
      //   margin-left: 45px;
      //   margin-top: -45px;
      // }
      .avatar {
        padding-right: 0.5em;
        padding-left: 10px;
      }
    }
    .tips {
      font-size: 12pt; // margin-top: 90%;
      position: absolute;
      bottom: 10%;
      left: 25%;
      right: 25%;
    }
  }

  .align-left {
    margin-left: 40px;
  }

  .align-right {
    margin-right: 40px;
  }

  .dialog-footer {
    background: @white;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    .chat-way {
      vertical-align: middle;
      padding: 5px;
      height: 40px;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      -webkit-flex-basis: 200px;
      -ms-flex-preferred-size: 200px;
      flex-basis: 200px;
      .chat-txt {
        border-radius: 6px;
        overflow: hidden;
        padding: 4px 30px;
        width: 170%;
        height: 180%;
        border: 1px solid #7d7e83;
        -webkit-transform: scale(.5);
        -ms-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        font-size: 30px;
      }
    }
    .component-dialogue-bar-person {
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      -webkit-flex-basis: 100px;
      -ms-flex-preferred-size: 100px;
      flex-basis: 100px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-align: start;
      -webkit-align-items: flex-start;
      -ms-flex-align: start;
      align-items: flex-start;
      position: relative;
    }
    .send {
      vertical-align: middle;
      margin: 5px 5px 0 0;
      height: 40px;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      max-width: 80px;
    }
  }

</style>
