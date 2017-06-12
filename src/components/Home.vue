<template>
  <div>
    <full-image/>
    <swiper :height="screenHeight" :show-dots="false" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
      <swiper-item>
        <div class="home">
          <div class="clock">
            {{now}}
          </div>
          <div class="days">
            {{today}}
          </div>

          <div v-show="showMessage" class="message">
            <transition name="v-transition" enter-active-class="animated slideInLeft">
              <img v-show="showMessage" class="avatar" src="/static/img/logo.jpg">
            </transition>
            <transition name="v-transition" enter-active-class="animated slideInRight">
              <div v-show="showMessage" class="info">
                当前共 {{curUsers}} 人 参与留言，
                <x-button mini plain class="button-primary-white" @click.native="viewLucky">点击此处</x-button>查看幸运楼层。</div>
            </transition>
          </div>

          <div class="tips">向右滑动加入留言</div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="box" ref="chatBox" :style="{'max-height':chatHeight}">

          <div class="message">
            <img class="avatar" :src="welcome.headimgurl">
            <div class="content align-left">
              <p class="user">{{welcome.nickname}} ({{welcome.province}}{{welcome.city}})</p>
              <div class="bubble bubble_default left">
                <p>欢迎 {{welcome.welUser}} 加入房间</p>
              </div>
            </div>
          </div>

          <transition-group enter-active-class="animated zoomIn">
            <div v-for="(item,floors) in comments" :key="floors" class="message" :class="{me:item.isMe}">
              <img class="avatar" :src="item.headimgurl">
              <div class="content" :class="{'align-right':item.isMe,'align-left':!item.isMe}">
                <p class="user" :class="{me:item.isMe}">{{item.nickname}} ({{item.province}}{{item.city}}) <span v-if="item.id">#{{item.id}}</span></p>
                <div class="bubble bubble_default" :class="{right:item.isMe,left:!item.isMe,bubble_primary:item.isMe}">
                  <p>{{item.content}}</p>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="dialog-footer">
          <div class="component-dialogue-bar-person">
            <div class="chat-way">
              <input type="text" class="chat-txt" v-model.trim="myChat" @keyup.enter="sendComment">
            </div>
            <x-button type="primary" :disabled="myChat==''" mini class="send" @click.native="sendComment">发送</x-button>
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
    mapState
  } from 'vuex'

  import FullImage from '@/components/IFullImage/index'
  import '../assets/css/arrow.css';
  import '../assets/css/wechat.css';
  import 'animate.css';

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
        curUser: '0',
        comments: [],
        showMessage: false,
        curid: {
          min: 0,
          max: 0,
        },
        welcome: '',
        toast: {
          show: false,
          msg: ''
        }
      }
    },
    computed: {
      ...mapState(['showArrow', 'userInfo', 'cdnUrl']),
      curUsers() {
        return numberComma(this.curUser);
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
      chatHeight() {
        // 窗体高度，底部高度，底部留白
        return (window.innerHeight - 50 - 15) + 'px';
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
      }
    },
    methods: {
      initWelInfo() {
        this.welcome = {
          nickname: '品质成钞',
          province: '成都',
          city: '温江',
          headimgurl: '/static/img/logo.jpg',
          welUser: this.userInfo.nickname,
          isMe: 0
        };
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
          needhide: 0
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
          this.comments.push({
            nickname: this.userInfo.nickname,
            province: this.userInfo.province,
            city: this.userInfo.city,
            headimgurl: this.userInfo.headimgurl,
            content: this.myChat,
            isMe: true,
            id: res.data.wx_id
          });
          setTimeout(() => {
            this.scrollToBottom();
          }, 1000);
          this.myChat = '';
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
        setInterval(() => {
          this.loadMoreComment();
        }, 3000);
      },
      getAllCommentNum() {
        let params = {
          s: '/addon/Api/Api/getAllCommentNum'
        }
        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res=>{
          this.curUser = res.data[0].num;
        })
      },
      init() {
        this.getAllCommentNum();
        setTimeout(() => {
          this.showMessage = true;
        }, 500);
        this.initWelInfo();
        this.loadCommentByTime();
      }
    },
    mounted() {
      this.init();
    },
    created() {
      this.refreshTime();
      document.title = '';
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
      padding: 5px 0;
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
