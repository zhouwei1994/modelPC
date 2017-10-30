<template>
  <div id="app">
    <head-top></head-top>
    <router-view class="router-view"></router-view>
    <foot-guide></foot-guide>
    <loading :value="pageLoading || dataLoading"></loading>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '@/components/header/head'
import footGuide from '@/components/footer/footGuide'
import loading from '@/components/common/loading'
export default {
  components:{
    headTop,
    footGuide,
    loading
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapState([
      'pageLoading',
      'dataLoading',
      'path',
    ])
  },
  created(){
    this.setCacheData();
  },
  methods:{
    ...mapMutations([
      'setCacheData'
    ])
  },
  mounted(){

  }
}
</script>
<style lang="scss">
@import 'src/style/common';
</style>

