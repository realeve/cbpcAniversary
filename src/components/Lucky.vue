<template>
  <div>
    <full-image/>
    <div class="home">
      <div class="title">
        <p class="main">品质成钞两周年留言活动</p>
        <p>幸运楼层列表</p>
      </div>
      <div class="box">
        <div v-for="(item,floors) in luckyList" :key="floors" class="message" :class="{me:item.isMe}">
          <div class="content">
            <p class="user" :class="{me:item.isMe}">{{item.nickname}} ({{item.province}}{{item.city}}) #{{item.id}}</p>
            <div class="bubble bubble_default" :class="{right:item.isMe,left:!item.isMe,bubble_primary:item.isMe,emoji:item.emoji}">
              <p v-html="item.content"></p>
              <p v-if="item.isMe" class="cgt">恭喜你获得幸运楼层，
                <x-button mini type="warn" class="cgt-button" @click.native="inputMyInfo">点击这里</x-button>输入个人领奖信息。</p>
            </div>
          </div>
          <img class="avatar" :src="item.headimgurl">
        </div>
      </div>
      <x-button mini plain class="button-primary-white" @click.native="viewHome">返回首页</x-button>
      <div class="footer">
        cbpc &copy; 2017 成都印钞有限公司
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XButton
  } from 'vux'

  import {
    mapState
  } from 'vuex'

  import FullImage from '@/components/IFullImage/index'
  import '../assets/css/wechat.css';

  export default {
    components: {
      XButton,
      FullImage
    },
    data() {
      return {
        luckyList: []
      }
    },
    computed: {
      ...mapState(['userInfo', 'cdnUrl'])
    },
    methods: {
      getLuckyUsers() {
        let params = {
          s: '/addon/Api/Api/getLuckyUsers'
        }
        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res => {
          this.luckyList = res.data.map(item => {
            item.isMe = (item.openid == this.userInfo.openid);
            return item;
          });
        })
      },
      viewHome() {
        this.$router.push('/');
      },
      inputMyInfo() {
        this.$router.push('/myinfo');
      },
      init() {
        this.getLuckyUsers();
        document.title = '品质成钞两周年';
      }
    },
    mounted() {
      this.init();
    }
  }

</script>

<style scoped lang="less">
  @white: #fff;
  .home {
    margin-top: 15%;
    height: 100%;
    text-align: center;
    color: @white;
    font-weight: 100;
    .title {
      .main {
        font-size: 13pt;
      }
      font-size: 25pt;
    }
    .box {
      margin-top: 10%;
      padding: 10px 20px;
      text-align: left;
      .message {
        margin-top: 10px;
        display: flex;
      }
    }
    .weui-btn_plain-default {
      color: #fff;
      border-color: #eee;
    }
    .footer {
      color: #bbb;
      padding: 10px 0;
    }
    .time {
      font-size: 10pt;
    }
    .user {
      padding-bottom: 5px;
    }
  }


  .align-left {
    margin-left: 40px;
  }

  .align-right {
    margin-right: 40px;
  }

  .cgt {
    font-size: 10pt;
    .cgt-button{
      padding:0 5px;
      margin:0 5px;
      background-color:#fbdf2c;
      color:#233;
    }
  }

</style>
