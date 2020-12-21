<template>
  <div class="calendarPendant">
    <div class="calendarInput" @click.stop="onShow">
      <slot>
        <input type="text" v-model="calendarData.name" />
      </slot>
    </div>
    <transition name="calendar">
      <div class="calendarBody" v-show="calendarShow">
        <span class="arrow"></span>
        <slot name="calendar">
          <z-calendar
            :range="calendarData.range"
            :zero="calendarData.zero"
            :begin="calendarData.begin || []"
            :end="calendarData.end || []"
            :lunar="calendarData.lunar"
            :value="calendarData.value"
            @select="calendarChange"
          ></z-calendar>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
import zCalendar from "@/components/common/calendar/index";
export default {
  components: {
    zCalendar,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    calendar: {
      type: Object,
      default: function () {
        return {
          name: "",
          // value: [2018, 1, 1], //默认日期
          // begin: [2015, 1, 1],
          // end: [2018, 1, 1],
          lunar: true, //显示农历
        };
      },
    },
  },
  data() {
    return {
      calendarShow: false,
      calendarData: {},
    };
  },
  watch: {
    value(val) {
      this.calendarShow = val;
    },
  },
  created() {
    this.calendarData = this.calendar;
  },
  methods: {
    onShow() {
      this.$emit("input", true);
      this.calendarShow = true;
    },
    calendarChange(val) {
      this.$emit("input", false);
      this.calendarShow = false;
      this.$emit("change", val);
      // this.calendar.select(val);
    },
  },
  mounted() {
    const _this = this;
    document.body.addEventListener("click", function () {
      _this.calendarShow = false;
      _this.$emit("input", false);
    });
  },
};
</script>

<style lang="scss">
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
