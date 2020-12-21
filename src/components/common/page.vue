<template>
  <div class="page-box page-center">
    <div class="page-content">
      <div
        class="page-btn"
        :class="{ none: currentIndex == 1 }"
        @click="previous"
      >
        上一页
      </div>
      <div
        class="page-btn"
        :class="{ act: currentIndex == item, more: item == '...' }"
        @click="current(item)"
        v-for="(item, index) of pageList"
        :key="index"
      >
        {{ item }}
      </div>
      <div
        class="page-btn"
        :class="{ none: total <= currentIndex }"
        @click="next"
      >
        下一页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    // eslint-disable-next-line vue/require-prop-types
    total: {
      default: "",
    },
    totalPage: {
      type: Number,
      default() {
        return 9;
      },
    },
    last: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      currentIndex: 1,
      pageList: [],
    };
  },
  watch: {
    total() {
      this.pageData();
    },
    currentPage(newVal) {
      this.currentIndex = newVal;
      this.pageData();
    },
  },
  created() {
    if (this.currentPage) {
      this.currentIndex = this.currentPage;
    }
    this.pageData();
  },
  methods: {
    pageData() {
      // eslint-disable-next-line no-array-constructor
      const list = new Array();
      let total = "";
      if (this.last) {
        total = this.total;
      } else {
        total = this.total > this.totalPage ? 10 : this.total;
      }
      if (this.totalPage >= total) {
        for (let i = 1; i <= total; i++) {
          list.push(i);
        }
      } else {
        const middle = Math.ceil(this.totalPage / 2);
        let start = this.currentIndex - (middle - 1);
        let end = this.currentIndex + (this.totalPage - middle);
        if (start <= 1) {
          start = 1;
          end = this.totalPage;
          for (let i = start; i <= end; i++) {
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
          for (let i = start; i <= end; i++) {
            list.push(i);
          }
        } else {
          list.push(1);
          list.push("...");
          start = start + 1;
          end = end - 1;
          for (let i = start; i <= end; i++) {
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
      if (this.currentIndex !== 1) {
        this.currentIndex--;
        this.pageData();
        this.$emit("change", this.currentIndex);
      }
    },
    next() {
      if (this.total > this.currentIndex) {
        this.currentIndex++;
        this.pageData();
        this.$emit("change", this.currentIndex);
      }
    },
    current(item) {
      if (item !== "..." && item !== this.currentIndex) {
        this.currentIndex = item;
        this.pageData();
        this.$emit("change", this.currentIndex);
      }
    },
  },
};
</script>

<style lang="scss">
$height: 28px;
.page-box {
  padding: 20px 0 40px 0;
  display: flex;
  justify-content: space-around;
  .page-content {
    height: $height;
    line-height: $height;
    display: flex;
    .page-btn {
      height: 100%;
      min-width: $height;
      text-align: center;
      margin: 0 7px;
      font-size: 14px;
      color: #666;
      border-radius: 4px;
      cursor: pointer;
      background-color: #fff;
      &.none {
        color: #aeaeae;
      }
      &.more {
        border-color: transparent;
        padding: 0;
        min-width: $height;
        background-color: inherit;
      }
      &.act {
        background-color: $themeColor;
        color: #fff;
        border-color: #f1f1f1;
        border-width: 2px 0;
      }
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
