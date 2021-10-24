<template>
  <div class="calendar">
    <ul>
      <li v-for="(item, index) in week" :key="index" class="weekTitle">
        {{ item }}
      </li>
    </ul>
    <ul v-for="(itemWeek, indexW) in dayList" :key="indexW">
      <li v-for="(itemDay, indexD) in itemWeek" :key="indexD">{{ itemDay }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      dayList: [],
      todayPosition: { weekNumber: 2, week: 2 },
      thisMonthDetial: Object,
    };
  },
  created() {
    this.computedDayList();
    // this.addDayStyle();
  },
  beforeMounted() {
    // this.addDayStyle();
  },
  mounted() {
    this.addDayStyle();
  },
  methods: {
    // 添加日期的样式
    addDayStyle: function () {
      //加载完成后才能获取节点
      // window.onload = () => {
      var calendarList = document.getElementsByClassName("calendar")[0];
      var weekNumberUl =
        calendarList.children[this.todayPosition.weekNumber + 1];
      var weekLi = weekNumberUl.children[this.todayPosition.week];
      //为当天添加类
      weekLi.classList += " today";
      //为其他月添加类
      for (let i = this.thisMonthDetial.lastDayWeek + 1; i < 7; i++) {
        calendarList.children[this.thisMonthDetial.sumWeek].children[
          i
        ].classList += "otherMonth";
      }
      for (let i = 0; i < this.thisMonthDetial.firstDayWeek; i++) {
        calendarList.children[1].children[i].classList += "otherMonth";
      }
      // };
    },
    //获取月份的详细信息
    getMonthDetail: function (today) {
      let sumDay = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      let firstDayWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      ).getDay();
      let lastDayWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        sumDay
      ).getDay();
      let sumWeek = (firstDayWeek + sumDay + (6 - lastDayWeek)) / 7;
      return {
        sumDay: sumDay,
        firstDayWeek: firstDayWeek,
        lastDayWeek: lastDayWeek,
        sumWeek: sumWeek,
      };
    },
    //计算出日期列表
    computedDayList: function () {
      const today = new Date();
      this.thisMonthDetial = this.getMonthDetail(today);
      const lastMonthDay = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastMonthDetial = this.getMonthDetail(lastMonthDay);
      let tempDay = 1 - this.thisMonthDetial.firstDayWeek;
      for (let i = 0; i < this.thisMonthDetial.sumWeek; i++) {
        this.dayList[i] = [];
        for (let ii = 0; ii < 7; ii++) {
          if (tempDay == today.getDate()) {
            this.todayPosition.weekNumber = i;
            this.todayPosition.week = ii;
          }
          this.dayList[i][ii] = tempDay;
          tempDay++;
        }
      }
      //处理上月末
      tempDay = lastMonthDetial.sumDay;
      for (let i = this.thisMonthDetial.firstDayWeek - 1; i >= 0; i--) {
        this.dayList[0][i] = tempDay;
        tempDay--;
      }

      // 处理下月初
      tempDay = 1;
      for (let i = this.thisMonthDetial.lastDayWeek + 1; i <= 6; i++) {
        this.dayList[this.thisMonthDetial.sumWeek - 1][i] = tempDay;
        tempDay++;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.calendar {
  padding: 10px;
  margin: 20px auto;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.507);
  ul {
    display: flex;
    flex-direction: row;
    li {
      margin: 3px;
      flex-grow: 1;
      width: 0;
      color: white;
      text-align: center;
      // background: #444;
    }
  }
  .weekTitle {
    font-weight: bold;
    color: rgb(16, 235, 140);
  }
  .today {
    color: red;
  }
  .otherMonth {
    color: rgba(0, 0, 0, 0.476);
  }
}
</style>
