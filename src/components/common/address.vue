<template>
  <div>
    <div class="provinceBox" v-if="type == 0 || type == 3">
      <div class="addressBox">
        <ul>
          <li v-for="(item,index) of provinceData" :key="index" :class="{'current':province.objId == item.objId}" @click="province = item">{{item.name}}</li>
        </ul>
        <ul>
          <li v-for="(item,index) of cityData" :key="index" :class="{'current':city.objId == item.objId}" @click="city = item">{{item.name}}</li>
        </ul>
        <ul v-if="type != 3">
          <li v-for="(item,index) of regionData" :key="index" :class="{'current':region.objId == item.objId}" @click="region = item">{{item.name}}</li>
        </ul>
      </div>
      <div class="but">
        <button @click="alladdress">全部地区</button>
        <button @click="onConfirm">确认</button>
      </div>
    </div>
    <z-selector v-if="type != 0 && type != 3" class="select" v-model="province" :data="provinceData"></z-selector>
    <z-selector v-if="type != 0 && type != 3" class="select" v-model="city" :data="cityData"></z-selector>
    <z-selector v-if="type == 1" class="select" v-model="region" :data="regionData"></z-selector>
  </div>
</template>
<script>
import zSelector from "@/components/common/selector";
import { regionApi } from "@/api/common.js";
export default {
  components: {
    zSelector
  },
  data() {
    return {
      province: {
        name: ""
      },
      city: {
        name: ""
      },
      region: {
        name: ""
      },
      provinceData: [],
      cityData: [],
      regionData: []
    };
  },
  props: {
    value: {
      default: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ]
    },
    type: {
      type: String,
      default: "1"
    }
  },
  created() {
    if (this.value) {
      if (this.value[0]) {
        this.province = this.value[0];
      }
      if (this.value[1]) {
        this.city = this.value[1];
      }
      if (this.value[2]) {
        this.region = this.value[2];
      }
    }
  },
  watch: {
    value(val) {
      if (val[0]) {
        this.province = val[0];
      }
      if (val[1]) {
        this.city = val[1];
      }
      if (val[2]) {
        this.region = val[2];
      }
    },
    province(val) {
      if (val.objId) {
        this.getRegion(val.objId, 1);
      }
      if (this.value[0] && this.value[0].name !== this.province.name) {
        this.city = {
          name: ""
        };
        this.region = {
          name: ""
        };
      }
      if (this.type == 1) {
        this.onConfirm();
      }
    },
    city(val) {
      if (this.value[1] && this.value[1].name !== this.city.name) {
        this.region = {
          name: ""
        };
      }
      if (val.objId) {
        this.getRegion(val.objId, 2);
      }

      if (val.objId && (this.type == 1 || this.type == 2 || this.type == 3)) {
        this.onConfirm();
      }
    },
    region(val) {
      if (val.name && this.type == 0) {
        console.log(val.objId);
        this.$emit("input", [this.province, this.city, val]);
      } else if (this.type == 1) {
        this.onConfirm();
      }
    }
  },
  methods: {
    getRegion(uid, state) {
      regionApi(uid).then(data => {
        if (data.success) {
          if (state == 0) {
            this.provinceData = data.data;
          } else if (state == 1) {
            this.cityData = data.data;
          } else if (state == 2) {
            data.data.unshift({
              name: "无",
              objId: ""
            });
            this.regionData = data.data;
          }
        } else {
          this.prompt(data.info);
        }
      });
    },
    alladdress() {
      this.province = {
        name: ""
      };
      this.city = {
        name: ""
      };
      this.region = {
        name: ""
      };
      this.$emit("input", "所有地区");
    },
    onConfirm() {
      if (this.region.name) {
        this.$emit("input", [this.province, this.city, this.region]);
      } else if (this.city.name) {
        this.$emit("input", [this.province, this.city]);
      } else if (this.province.name) {
        this.$emit("input", [this.province]);
      } else {
        if (this.type == 0 || this.type == 3) {
          this.$emit("input", "所有地区");
        } else {
          this.$emit("input", []);
        }
      }
    }
  },
  mounted() {
    this.getRegion(0, 0);
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";
.select {
  &:nth-child(2),
  &:nth-child(3) {
    margin-left: 20px;
  }
  input {
    height: 36px;
  }
}
.provinceBox {
  background-color: #ffff;
  > .addressBox {
    display: flex;
    width: 410px;
    padding: 15px;
    ul {
      height: 300px;
      overflow-y: auto;
      /*滚动条样式*/
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 1px;
        /*高宽分别对应横竖滚动条的尺寸*/
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #ccc;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 2px;
        background-color: #fff;
      }
      li {
        width: 125px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover,
        &.current {
          background-color: $mainColor;
          color: #fff;
        }
      }
    }
  }
  .but {
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    button {
      width: 130px;
      height: 34px;
      background-color: #006cdb;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
