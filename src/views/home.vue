<template>
  <div></div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
