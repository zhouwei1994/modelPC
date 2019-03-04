<template>
  <div class="selector" @click.stop>
    <div>
      <input
        type="text"
        v-model="search"
        ref="input"
        placeholder="请选择"
        @focus="selectShow"
        @blur="selectBlur"
      >
      <i @click.stop="getFocus"></i>
    </div>
    <transition name="fade">
      <div class="select-dropdown" :class="{'top':direction}" v-if="selectState == 1">
        <div class="arrow"></div>
        <ul class="selectorBox">
          <p>可首字母查询</p>
          <li
            v-for="(item,index) of selectList"
            :key="index"
            @click="assignment(item)"
          >{{item.name}}</li>
          <li v-if="selectList.length <= 0">无匹配数据</li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import makePy from "@/plugins/pinyin.js";
export default {
  data() {
    return {
      selectList: [],
      selectState: 0,
      direction: false,
      search: ""
    };
  },
  props: {
    value: {
      default: {}
    },
    data: {
      type: Array,
      default: []
    },
    show: {
      default: false
    }
  },
  created() {
    if (this.value) {
      this.search = this.value.name;
    }
    this.selectState = this.show;
    this.selectList = [];
  },
  watch: {
    value(val) {
      if (val) {
        this.search = val.name;
      }
    },
    data(val) {
      this.getSearch(this.search);
    },
    search(val) {
      console.log(val);
      if (val == "") {
        this.$emit("input", {});
      } else {
        this.getSearch(val);
      }
    },
    selectState(val) {
      if (val == 1) {
        this.selectStateChange();
      }
    },
    show(val) {
      this.selectState = val;
    }
  },
  methods: {
    //显示
    selectShow() {
      this.selectState = 1;
      this.getSearch("");
    },
    //关闭
    selectHide() {
      this.selectState = 0;
    },
    //获取焦点
    getFocus() {
      this.$refs.input.focus();
    },
    //判断显示方向
    selectStateChange() {
      var el = this.$el;
      var top = el.offsetTop;
      var height =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (height - (top - scroll) < 300) {
        this.direction = true;
      } else {
        this.direction = false;
      }
    },
    //赋值
    assignment(item) {
      this.search = item.name;
      this.selectState = 0;
      this.$emit("input", item);
    },
    //筛选
    getSearch(val) {
      if (val == "") {
        this.selectList = this.data;
      } else {
        var newArr = new Array();
        for (var item of this.data) {
          // console.log(item.name, val);
          var pinyin = makePy(item.name);
          var rule = new RegExp(val, "ig");
          if (item.name == val) {
            newArr.push(item);
          } else if (rule.test(pinyin) || rule.test(item.name)) {
            newArr.push(item);
          }
        }
        this.selectList = newArr;
      }
    },
    selectBlur() {
      setTimeout(() => {
        this.$emit("blur");
      }, 100);
    }
  },
  mounted() {
    const _this = this;
    document.body.onclick = () => {
      this.selectState = false;
      var children = this.$parent.$parent.$children;
      for (var item of children) {
        if (item.selectState) {
          item.selectState = false;
        }
        findChildren(item.$children);
      }
      function findChildren(data) {
        for (var itemChild of data) {
          if (itemChild.selectState) {
            itemChild.selectState = false;
          }
          if (itemChild.$children.length > 0) {
            findChildren(itemChild.$children);
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.selector {
  width: 100%;
  height: 36px;
  line-height: 36px;
  white-space: nowrap;
  position: relative;
  background-color: #fff;
  > div {
    border: solid 1px #eeeeee;
    display: flex;
    border-radius: 2px;
    input {
      width: 100%;
      border: 0;
      padding: 0 10px;
      font-size: 14px;
      color: #999999;
    }
    i {
      width: 15px;
      position: relative;
      flex-shrink: 0;
      cursor: pointer;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0%;
        width: 0px;
        height: 0px;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 5px solid #999;
        transition: all 0.6;
        transform: rotate(0deg);
      }
    }
  }
  .select-dropdown {
    position: absolute;
    left: 0px;
    top: calc(100% + 10px);
    min-width: 100%;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    z-index: 10;
    &.top {
      bottom: calc(100% + 10px);
      top: initial;
      .arrow {
        bottom: -7px;
        top: initial;
        border-top: 7px solid #eeeeee;
        border-bottom: initial;
        &::after {
          bottom: 2px;
          top: initial;
          border-top: 5px solid #fff;
          border-bottom: initial;
        }
      }
    }
    .arrow {
      position: absolute;
      left: 25px;
      top: -7px;
      width: 0px;
      height: 0px;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-bottom: 7px solid #eeeeee;
      &::after {
        position: absolute;
        content: "";
        left: 50%;
        top: 2px;
        width: 0px;
        height: 0px;
        transform: translateX(-50%);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid #fff;
      }
    }

    ul {
      width: 100%;
      max-height: 257px;
      overflow-y: auto;
      padding: 5px 0;
      /*滚动条样式*/
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px;
        /*高宽分别对应横竖滚动条的尺寸*/
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #3198db;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 2px;
        background-color: #fff;
      }
      p {
        font-size: 12px;
        padding: 0px 5px 0px 15px;
        color: #999;
        height: initial;
        line-height: initial;
      }
      li {
        padding: 0 15px;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        white-space: nowrap;
        &:hover {
          background-color: #eaf4ff;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
