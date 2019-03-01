<template>
  <div class="page-box page-center">
    <div class="page-content">
      <div class="page-btn" :class="{'none': currentIndex == 1}" @click="previous">上一页</div>
      <div
        class="page-btn"
        :class="{'act':currentIndex == item,'more':item == '...'}"
        @click="current(item)"
        v-for="(item,index) of pageList"
        :key="index"
      >{{item}}</div>
      <div class="page-btn" :class="{'none': total == currentIndex}" @click="next">下一页</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      pageList: []
    };
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      default: ""
    },
    totalPage: {
      type: Number,
      default: function() {
        return 9;
      }
    },
    last: {
      type: Boolean,
      default: function() {
        return true;
      }
    }
  },
  watch: {
    total(newVal) {
      this.pageData();
    },
    currentPage(newVal) {
      this.currentIndex = this.currentPage;
      this.pageData();
    }
  },
  created() {
    if (this.currentPage) {
      this.currentIndex = this.currentPage;
    }
    this.pageData();
  },
  methods: {
    pageData() {
      let list = new Array();
      let total = "";
      if (this.last) {
        total = this.total;
      } else {
        total = this.total > this.totalPage ? 10 : this.total;
      }
      if (this.totalPage >= total) {
        for (var i = 1; i <= total; i++) {
          list.push(i);
        }
      } else {
        const middle = Math.ceil(this.totalPage / 2);
        let start = this.currentIndex - (middle - 1);
        let end = this.currentIndex + (this.totalPage - middle);
        if (start <= 1) {
          start = 1;
          end = this.totalPage;
          for (var i = start; i <= end; i++) {
            list.push(i);
          }
          list.push("...");
          if (this.last) {
            list.push(this.total);
          }
        } else if (end >= this.total) {
          list.push(1);
          list.push("...");
          start = this.total - this.totalPage + 1;
          end = this.total;
          for (var i = start; i <= end; i++) {
            list.push(i);
          }
        } else {
          list.push(1);
          list.push("...");
          start = start + 1;
          end = end - 1;
          for (var i = start; i <= end; i++) {
            list.push(i);
          }
          list.push("...");
          if (this.last) {
            list.push(this.total);
          }
        }
      }
      this.pageList = list;
    },
    previous() {
      if (this.currentIndex != 1) {
        this.currentIndex--;
        this.pageData();
        this.$emit("current-change", this.currentIndex);
      }
    },
    next() {
      if (this.total != this.currentIndex) {
        this.currentIndex++;
        this.pageData();
        this.$emit("current-change", this.currentIndex);
      }
    },
    current(item) {
      if (item != "..." && item != this.currentIndex) {
        this.currentIndex = item;
        this.pageData();
        this.$emit("current-change", this.currentIndex);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../style/mixin";
.page-box {
  padding: 20px 0 40px 0;
  display: flex;
  justify-content: space-around;
  .page-content {
    height: 32px;
    line-height: 32px;
    display: flex;
    .page-btn {
      height: 100%;
      min-width: 32px;
      text-align: center;
      margin: 0 7px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      border-radius: 4px;
      &.none {
        color: #aeaeae;
      }
      &.more {
        border-color: transparent;
        padding: 0;
        min-width: 32px;
        background-color: inherit;
      }
      &.act {
        background-color: #006cdb;
        color: #fff;
        border-color: #f1f1f1;
        border-width: 2px 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
