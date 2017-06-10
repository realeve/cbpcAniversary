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
          <img class="avatar" :src="item.header" title="jf">
          <div class="content">
            <p class="user">{{item.nickname}} ({{item.prov}}{{item.city}}) #{{item.floor}}</p>
            <div class="bubble left bubble_default">
              <p>{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        cbpc &copy; 2017 成都印钞有限公司
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem,
    XInput,
    XButton
  } from 'vux'

  import {
    dateFormat,
    querystring,
    numberComma
  } from 'vux'

  import {
    mapState
  } from 'vuex'

  import FullImage from '@/components/IFullImage/index'
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
        now: '00:00',
        luckyList: []
      }
    },
    computed: {

    },
    methods: {
      init() {
        for (var i = 0; i < 30; i++) {
          this.luckyList.push({
            floor: 16 + i * 200,
            nickname: '宾不厌诈',
            prov: '成都',
            city: '温江',
            header: 'data:image/jpeg;base64,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',
            time: '2017-06-07 12:23',
            content:'留几句言'
          })
        }
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
    .box{
      margin-top: 10%;
      padding: 10px 20px;
      text-align: left;
      .message{
        margin-top:10px;
      }
    }
    .footer{
      color:#bbb;
      padding:10px 0;
    }
  }

</style>
