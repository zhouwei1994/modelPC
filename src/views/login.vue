<template>
  <div>
      你好
      <span>wode</span>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
  },
  data (){
    return {}
  },
  computed: {
		...mapState(['userInfo'])
	},
  created(){ 
    console.log("-----423423",this.userInfo);
    // twin.create();
  },
  mounted() {
    
  },
}
</script>

<style lang="scss" scoped>

</style>