<template>
  <div class="calendarPendant">
    <div class="calendarInput" @click.stop="onShow">
      <slot>
        <input type="text" v-model="calendar.name">
      </slot>
    </div>
    <transition name="calendar">
      <div class="calendarBody" v-show="calendarShow">
        <span class="arrow"></span>
        <slot name="calendar">
          <calendar
            :range="calendar.range"
            :zero="calendar.zero"
            :begin="calendar.begin || []"
            :end="calendar.end || []"
            :lunar="calendar.lunar"
            :value="calendar.value"
            @select="calendarChange"
          ></calendar>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
import calendar from "./calendar";
export default {
  components: {
    calendar
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    calendar: {
      type: Object,
      default: {
        name: "2018-1-1",
        value: [2018, 1, 1], //默认日期
        begin: [2015, 1, 1],
        end: [2018, 1, 1],
        lunar: true, //显示农历
        select: begin => {
          console.log(begin);
        }
      }
    }
  },
  data() {
    return {
      calendarShow: false
    };
  },
  watch: {
    value(val) {
      this.calendarShow = val;
    }
  },
  created() {},
  methods: {
    onShow() {
      this.$emit("input", true);
      this.calendarShow = true;
    },
    calendarChange(val) {
      this.$emit("input", false);
      this.calendarShow = false;
      this.calendar.select(val);
    }
  },
  mounted() {
    document.body.onclick = () => {
      this.calendarShow = false;
      this.$emit("input", false);
      var children = this.$parent.$parent.$children;
      for (var item of children) {
        if (item.calendarShow) {
          item.calendarShow = false;
        }
        findChildren(item.$children);
      }
      function findChildren(data) {
        for (var itemChild of data) {
          if (itemChild.calendarShow) {
            itemChild.calendarShow = false;
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

<style lang="scss">
@import "../../style/mixin";
.calendarPendant {
  position: relative;
  input {
    height: 40px;
    border: 1px solid #eee;
    padding: 0 10px;
  }
  .calendarBody {
    position: absolute;
    top: calc(100% + 10px);
    left: 0px;
    box-shadow: 0px 0px 10px 0px #ccc;
    z-index: 5;
    background-color: #fff;
    .arrow {
      position: absolute;
      top: -7px;
      left: 50px;
      content: "";
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #ccc;
      border-left: 7px solid transparent;
      &::after {
        position: absolute;
        top: 1px;
        left: 50%;
        content: "";
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        border-left: 7px solid transparent;
      }
    }
  }
}
/*transition*/
.calendar-enter-active,
.calendar-leave-active {
  transition: all 0.5s ease-in-out;
}
.calendar-enter,
.calendar-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
