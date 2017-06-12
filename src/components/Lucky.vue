<template>
  <div>
    <full-image/>
    <div class="home">
      <div class="title">
        <p class="main">品质成钞两周年留言活动</p>
        <p>幸运楼层列表</p>
      </div>
      <div class="box">
        <div v-for="(item,floors) in luckyList" class="message">
          <img class="avatar" :src="item.headimgurl">
          <div class="content">
            <p class="user">{{item.nickname}} ({{item.province}}{{item.city}}) #{{item.id}}</p>
            <div class="bubble left bubble_default">
              <p>{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <x-button plain class="button-primary-white" @click.native="viewHome">返回首页</x-button>
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
      ...mapState(['cdnUrl'])
    },
    methods: {
      getLuckyUsers() {
        let params = {
          s: '/addon/Api/Api/getLuckyUsers'
        }
        this.$http.jsonp(this.cdnUrl, {
          params
        }).then(res => {
          this.luckyList = res.data;
        })
      },
      viewHome() {
        this.$router.push('/');
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
    .weui-btn_plain-default{
      color:#fff;
      border-color:#eee;
    }
    .footer {
      color: #bbb;
      padding: 10px 0;
    }
  }

</style>
