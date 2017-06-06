<template>
  <div>
    <div class="page-bg"></div>
    <div class="bg-dot"></div>
    <div class="fixedcon">
      <div class="control">
        <!--i class="music show" :class="{mute}" title="背景音乐" @click="audioPlayer"></i-->
        <audio src="/static/bg.mp3" autoplay loop="loop" ref="audio"></audio>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import "./style.css";

</style>
<script>
  export default {
    data() {
      return {
        mute: false,
      }
    },
    computed: {
      player() {
        return this.$refs.audio;
      }
    },
    methods: {
      audioPlayer() {
        if (this.player.paused) {
          this.player.play();
        } else {
          this.player.pause();
        }
        this.mute = !this.mute;
      }
    },
    mounted() {
      this.player.volume = 0.4;
    },
    activated(){
      this.player.play();
    }
  }

</script>
