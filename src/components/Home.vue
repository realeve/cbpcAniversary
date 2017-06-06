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
          <div class="tips">向右滑动加入留言</div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="box" :style="{'max-height':chatHeight}">
          <div v-for="n in 2" class="message me">
            <img class="avatar" src="../assets/img/avatar.jpg" title="jf">
            <div class="content">
              <div class="bubble right bubble_primary">
                <p>这里是我的一句留言，当然呢字数有一点点多啦</p>
              </div>
            </div>
          </div>
          <div v-for="n in 12" class="message">
            <img class="avatar" src="../assets/img/avatar.jpg" title="jf">
            <div class="content">
              <div class="bubble left bubble_default">
                <p>这里是吃瓜群众的一句留言，当然呢字数有一点点多啦</p>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <!--<x-input title="发送验证码" class="weui-vcode">
            <x-button slot="right" type="primary" mini>发送验证码</x-button>
          </x-input>-->
          <div class="component-dialogue-bar-person">
            <div class="chat-way">
              <input type="text" class="chat-txt" v-model="myChat">
            </div>
            <x-button type="primary" mini class="send">发送</x-button>
          </div>
        </div>
      </swiper-item>
    </swiper>

    <div v-show="showArrow" class="iSlider-arrow-right iSlider-arrow-white-right"></div>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem,
    XInput,
    XButton,
    dateFormat,
    querystring
  } from 'vux'

  import FullImage from '@/components/IFullImage/index'
  import '../assets/css/arrow.css';
  import '../assets/css/wechat.css';

  export default {
    components: {
      Swiper,
      SwiperItem,
      XInput,
      XButton,
      FullImage
    },
    data() {
      return {
        showArrow: true,
        now: '00:00:00',
        swiperItemIndex: 0,
        myChat:''
      }
    },
    computed: {
      today() {
        return dateFormat(new Date(), 'M月D日 星期E');
      },
      screenHeight() {
        return window.innerHeight + 'px';
      },
      chatHeight() {
        return (window.innerHeight - 50) + 'px';
      }
    },
    methods: {
      refreshTime() {
        setInterval(() => {
          this.now = dateFormat(new Date(), 'HH:mm:ss');
        }, 1000);
      },
      onSwiperItemIndexChange(index) {
        this.showArrow = index == 0;
      },
    },
    mounted() {
      this.refreshTime();

      let param = querystring.parse('a=b&c=d');
      console.log(param);
    }
  }

</script>

<style scoped lang="less">
  .home {
    margin-top: 15%;
    height: 100%;
    text-align: center;
    color: #fff;
    font-weight: 100;
    .clock {
      font-size: 50pt;
    }
    .days {
      font-size: 12pt;
      margin-top: -5px;
    }

    .tips {
      font-size: 15pt;
      margin-top: 90%;
    }
  }

  .dialog-footer {
    background: #fff;
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
    .send{
      vertical-align: middle;
      margin:5px 5px 0 0;
      height: 40px;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      max-width:80px;
    }
  }

</style>
