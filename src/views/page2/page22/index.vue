<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="tags clearfix">
        <el-col :span="4" v-for="(item, index) in tagList" :key="index">
          <div class="tag">
            <div class="left">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
            <div class="right"></div>
          </div>
        </el-col>
      </div>
      <div class="echarts-box clearfix">
        <el-col :span="12">
          <div class="echarts">
            <my-echarts :options="options1"></my-echarts>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="echarts">
            <my-echarts :options="options2"></my-echarts>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import MyEcharts from "@/components/MyEcharts";
export default {
  components: {
    MyEcharts,
  },
  // 定义属性
  data() {
    return {
      tagList: [
        {
          title: "今日过偏差触发",
          value: "2",
          icon: "",
        },
        {
          title: "今日生产吻合率",
          value: "92%",
          icon: "",
        },
        {
          title: "今日过偏差触发",
          value: "2",
          icon: "",
        },
        {
          title: "今日过偏差触发",
          value: "2",
          icon: "",
        },
        {
          title: "今日生产吻合率",
          value: "92%",
          icon: "",
        },
        {
          title: "今日过偏差触发",
          value: "2",
          icon: "",
        },
      ],
      options1: {},
      options2: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(["dictList"]),
    getName() {
      return function (type) {
        let obj = this.dictList.find((item) => {
          return item.type == type;
        });
        if (obj) {
          return obj.name;
        }
      };
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getNowTime() {
      let now = new Date();
      return parseTime(now, "{y}-{m}-{d} {h}:{i}:{s}");
    },
    async getEchartOptions() {
      try {
        let data = {
          timeRangeType: "NEXT_24H_TIME",
          type: ["stove_a", "stove_b"],
        };
        let options = await this.$API.ltlf.defaultGraphicDataByType(data);
        let nowTime = this.getNowTime();
        let xAxisData = options.data.dateinterval;
        let seriesData1 = [];
        let seriesData2 = [];
        let markLineData = [];
        markLineData.push({
          xAxis: nowTime.slice(0, 13) + ":00:00",
        });
        seriesData1.push({
          type: "line",
          markLine: {
            lineStyle: {
              type: "solid",
              color: "#000",
            },
            symbol: ["none", "none"],
            label: { show: false },
            data: markLineData,
          },
        });
        seriesData2.push({
          type: "line",
          markLine: {
            lineStyle: {
              type: "solid",
              color: "#000",
            },
            symbol: ["none", "none"],
            label: { show: false },
            data: markLineData,
          },
        });

        for (const key in options.data.stoveLineChartDtoMap) {
          if (
            Object.hasOwnProperty.call(options.data.stoveLineChartDtoMap, key)
          ) {
            const element = options.data.stoveLineChartDtoMap[key];
            let name = this.getName(key);
            switch (key) {
              case "stove_a":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData1.push({
                  name: name,
                  type: "line",
                  stack: "Total1",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData1.push({
                  name: name,
                  type: "line",
                  stack: "Total2",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: planData,
                });
                break;
              case "stove_b":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData2.push({
                  name: name,
                  type: "line",
                  stack: "Total1",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData2.push({
                  name: name,
                  type: "line",
                  stack: "Total2",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: planData,
                });
                break;
              default:
                break;
            }
          }
        }
        this.options1 = {
          title: {
            text: "炉A实际和计划功率曲线",
            textStyle:{
              fontSize:16
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },

          grid: {
            left: "2%",
            right: "2%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: xAxisData,
              /*  axisLabel: {
                show: true,
                rotate: 90,
              }, */
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: seriesData1,
        };
        this.options2 = {
          title: {
            text: "炉B实际和计划功率曲线",
            textStyle:{
              fontSize:16
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },

          grid: {
            left: "2%",
            right: "2%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: xAxisData,
              /*  axisLabel: {
                show: true,
                rotate: 90,
              }, */
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: seriesData2,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getEchartOptions();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
.app-container {
  .tag {
    background: #f2f2f7;
    border-radius: 8px;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .value {
      margin-top: 5px;
      font-size: 16px;
      color: #34c758;
      font-weight: bold;
    }
  }
  .echarts-box {
    margin-top: 15px;
    .echarts {
      height: 300px;
    }
  }
}
</style>