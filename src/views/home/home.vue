<template>
  <div>
    <z-header></z-header>
    <div class="page_center">
      <div class="swiper_box">
        <Swiper class="swiper" v-if="bannerList.length > 0" :autoPlay="true" :showIndicator="false">
          <Slide v-for="(item, index) in bannerList" :key="index">
            <img :src="item.imgUrl" />
          </Slide>
        </Swiper>
      </div>
    </div>
    <z-footer></z-footer>
  </div>
</template>
<script>
import {
  Swiper,
  Slide
} from "vue-swiper-component";
import {
  mapState
} from "vuex";
export default {
  name: "Home",
  components: {
    Swiper,
    Slide,
  },
  data() {
    return {
      bannerList: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onPageJump(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.page_center {
  position: relative;
}
</style>
