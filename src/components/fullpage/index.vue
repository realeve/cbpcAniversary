<template>
    <div>
        <IFullImg/>
        <div id="fullpage">
            <div class="section home" :style="{height:pageHeight}">
                <div class="clock">
                    22:11
                </div>
                <!--<div class="content">
                    <p class="title">品质成钞两周年庆</p>
                </div>-->
                <div class="tips">向下滑动加入留言</div>
            </div>
            <div class="section" :style="{'min-height':pageHeight}">
                <div class="box chat">
                    <div class="message me">
                        <img class="avatar" src="./assets/avatar.jpg" title="xx">
                        <div class="content">
                            <div class="bubble right bubble_primary">
                                <p>这里是我的一句留言，当然呢字数有一点点多啦</p>
                            </div>
                        </div>
                    </div>

                    <div v-for="n in 12" class="message ">
                        <img class="avatar" src="./assets/avatar.jpg" title="jf">
                        <div class="content">
                            <div class="bubble left bubble_default">
                                <p>这里是吃瓜群众的一句留言，当然呢字数有一点点多啦</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="showArrow" class="iSlider-arrow iSlider-white"></div>
    </div>
</template>
<script>
    import './assets/javascript.fullPage.css';
    import './assets/arrow.css';
    import './assets/wechat.css';
    import './assets/fonts/PingFang Light.css';
    import fullpage from './assets/javascript.fullPage.js';
    import IFullImg from '../IFullImage/IFullImage';

    export default {
        data() {
            return {
                showArrow: true
            }
        },
        components: {
            IFullImg
        },
        computed: {
            pageHeight() {
                return window.innerHeight + 'px';
            }
        },
        methods: {
            init() {
                let that = this;
                fullpage.initialize('#fullpage', {
                    css3: true,
                    onLeave: function (index, nextIndex, direction) {
                        if (direction == 'down' && nextIndex == 2) {
                            that.showArrow = false;
                        } else {
                            that.showArrow = true;
                        }
                    }
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>

<style scoped>
    .home {
        color: #fff;
        font-weight: 100;
        text-align: center;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        font-family: "PingFang Light";
    }

    .title {
        margin-top: 30%;
        font-size: 22pt;
    }

    .clock {
        text-align: center;
        font-size: 60pt;
        padding-top: 20%;
    }

    .tips {
        font-size: 15pt;
        margin-top: 80%;
    }

    .chat {
        padding-top: 30px;
        font-size: 12pt;
        color: #111;
    }
</style>