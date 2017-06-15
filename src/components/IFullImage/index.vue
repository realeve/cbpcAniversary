<template>
  <div>
    <div class="page-bg"></div>
    <div class="bg-dot"></div>
    <div class="fixedcon">
      <div class="control">
        <v-touch tag="i" v-on:tap="audioPlayer" v-show="showArrow" class="music show" :class="{mute}" title="背景音乐" ></v-touch>
        <audio src="//cbpm.sinaapp.com/cdn/audio/bg.mp3" loop="loop" autoplay ref="audio"></audio>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import "./style.css";

</style>
<script>
  import {
    mapState,mapMutations
  } from 'vuex'
  export default {
    computed: {
      ...mapState(['showArrow', 'cdnUrl']),
      player() {
        return this.$refs.audio;
      },
      mute:{
        get(){
          return this.$store.state.mute;
        },
        set(val){
          this.muteSound(val);
        }
      },
      closeMusic:{
        get(){
          return this.$store.state.closeMusic;
        },
        set(val){
          this.closeMusicByUser(val);
        }
      }
    },
    watch:{
      mute(val){
        if(val){
          this.player.pause();
        }else{
          this.player.play();
        }
      }
    },
    methods: {
      ...mapMutations(['muteSound','closeMusicByUser']),
      audioPlayer() {
        this.mute = !this.mute;
        this.closeMusic = true;
      }
    },
    mounted() {
      this.player.volume = 0.4;
    }
  }

</script>
