<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="14" class="left">
        <div class="echarts-box">
          <div class="tools">
            <my-time-select @changeTime="changeTime1"></my-time-select>
          </div>
          <div class="echarts">
            <my-echarts :options="options1"></my-echarts>
          </div>
        </div>
        <div class="echarts-box">
          <div class="tools">
            <my-time-select @changeTime="changeTime2"></my-time-select>
          </div>
          <div class="echarts">
            <my-echarts :options="options2"></my-echarts>
          </div>
        </div>
        <div class="echarts-box">
          <div class="tools">
            <my-time-select @changeTime="changeTime3"></my-time-select>
          </div>
          <div class="echarts">
            <my-echarts :options="options3"></my-echarts>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="right">
        <my-table-edit
          ref="myTableEdit"
          :tableColumns="tableColumns"
          :tableData="tableData"
          :border="true"
          :title="title"
          :time="time"
          @changeTableData="changeTableData"
        >
          <template #nextRenewTime="{ data }">
            <el-badge
              :hidden="!data.isShowBadge"
              :value="data.isShowBadge ? '+1' : ''"
              class="item"
            >
              <span>{{ data.nextRenewTime.slice(11) }}</span>
            </el-badge>
          </template>
        </my-table-edit>
        <div class="echarts">
          <my-echarts :options="options4"></my-echarts>
        </div>
        <div class="echarts">
          <my-echarts :options="options5"></my-echarts>
        </div>
        <div class="echarts">
          <my-echarts :options="options6"></my-echarts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import MyTimeSelect from "@/components/MyTimeSelect";
import MyEcharts from "@/components/MyEcharts";
import MyTableEdit from "@/components/MyTableEdit";
export default {
  components: {
    MyTimeSelect,
    MyEcharts,
    MyTableEdit,
  },
  // 定义属性
  data() {
    return {
      timeSelectList: this.$global,
      params1: {},
      options1: {},
      params2: {},
      options2: {},
      params3: {},
      options3: {},
      tableColumns: [
        {
          label: "时刻",
          slotName: "nextRenewTime",
          noEdit: true,
        },
        {
          label: "炉A",
          prop: "stoveA",
        },
        {
          label: "炉B",
          prop: "stoveB",
        },
        {
          label: "供电能力",
          prop: "supply",
          noEdit: true,
        },
      ],
      tableData: [],
      title: "",
      time: "",
      options4: {},
      options5: {},
      options6: {},
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
    async getEchartOptions1(data) {
      try {
        let options = await this.$API.ltlf.defaultGraphicDataByType(data);
        let nowTime = this.getNowTime();
        let legendData = [];
        data.type.map((item) => {
          legendData.push(this.getName(item));
        });
        let xAxisData = options.data.dateinterval;
        let seriesData = [];
        let markLineData = [];
        markLineData.push({
          xAxis: nowTime.slice(0, 13) + ":00:00",
        });
        seriesData.push({
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
              case "loadFullDemand":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  lineStyle: {
                    color: "rgb(255,0,0)",
                  },
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  lineStyle: {
                    color: "rgb(255,0,0)",
                  },
                  showSymbol: false,
                  data: planData,
                });
                break;
              case "stove_a":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
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
                seriesData.push({
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
                seriesData.push({
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
                seriesData.push({
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
              case "supplyList":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
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
            left: "0",
            top: "0",
            text: "中长期负荷安排曲线",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
          legend: {
            data: legendData,
            bottom: "10%",
          },
          grid: {
            left: "2%",
            right: "2%",
            bottom: "20%",
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
          graphic: [
            {
              type: "text",
              left: "5",
              top: "30",
              style: {
                text: `更新时间：${nowTime}`,
                fill: "rgba(0,0,0,0.65)", // 文本颜色
                fontSize: 12,
              },
            },
            {
              type: "text",
              right: "0%",
              bottom: "0%",
              style: {
                text: `下一个负荷分配时刻：${options.data.loadDistribute}`,
                fill: "rgba(0,0,0,0.65)", // 文本颜色
                fontSize: 12,
              },
            },
          ],
          series: seriesData,
        };
      } catch (error) {}
    },
    changeTime1(params) {
      this.params1 = params;
      this.getEchartOptions1({
        [params.type]: params.value,
        type: ["stove_a", "stove_b", "supplyList", "loadFullDemand"],
      });
    },
    async getEchartOptions2(data) {
      try {
        let options = await this.$API.ltlf.defaultGraphicDataByType(data);
        let nowTime = this.getNowTime();
        let legendData = [];
        data.type.map((item) => {
          legendData.push(this.getName(item));
        });
        let xAxisData = options.data.dateinterval;
        let seriesData = [];
        let markLineData = [];
        markLineData.push({
          xAxis: nowTime.slice(0, 13) + ":00:00",
        });
        seriesData.push({
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
        let markAreaData = [];
        options.data.adviceTimeRangeList.map((item) => {
          let keys = Object.keys(item);
          keys.map((key) => {
            markAreaData.push([
              {
                xAxis: key,
              },
              {
                xAxis: item[key],
              },
            ]);
          });
        });
        seriesData.push({
          type: "line",
          markArea: {
            itemStyle: {
              color: "rgba(229, 229, 229, 1)",
            },
            data: markAreaData,
            // 鼠标移入时的样式
            emphasis: {
              itemStyle: {
                color: "rgba(229, 229, 229, 1)", // 设置透明度为 0 使得颜色不变
              },
              borderColor: "rgba(229, 229, 229, 1)", // 同样设置边框颜色
            },
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
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: planData,
                });
                break;
              case "stove_b":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: planData,
                });
                break;
              case "windPowerList":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
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
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
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

        this.options2 = {
          title: {
            left: "0",
            top: "0",
            text: "中长期负荷检修建议",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
          legend: {
            data: legendData,
            bottom: "0%",
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
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          graphic: [
            {
              type: "text",
              left: "5",
              top: "30",
              style: {
                text: `更新时间：${nowTime}`,
                fill: "rgba(0,0,0,0.65)", // 文本颜色
                fontSize: 12,
              },
            },
          ],
          series: seriesData,
        };
      } catch (error) {}
    },
    changeTime2(params) {
      this.params2 = params;
      this.getEchartOptions2({
        [params.type]: params.value,
        type: ["stove_a", "stove_b", "windPowerList", "adviceRangeTime"],
      });
    },
    async getEchartOptions3(data) {
      try {
        let options = await this.$API.ltlf.defaultGraphicDataByType(data);
        let nowTime = this.getNowTime();
        let legendData = [];
        data.type.map((item) => {
          legendData.push(this.getName(item));
        });
        let xAxisData = options.data.dateinterval;
        let seriesData = [];
        let markLineData = [];
        markLineData.push({
          xAxis: nowTime.slice(0, 13) + ":00:00",
        });
        seriesData.push({
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
              case "loadFullDemand":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  lineStyle: {
                    color: "rgb(255,0,0)",
                  },
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  lineStyle: {
                    color: "rgb(255,0,0)",
                  },
                  showSymbol: false,
                  data: planData,
                });

                break;
              case "windPowerList":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total1",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total2",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: planData,
                });
                break;
              case "netPowerList":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total1",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total2",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: planData,
                });
                break;
              case "exhaustPowerList":
                var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total1",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: historyData,
                });
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData.push({
                  name: name,
                  type: "line",
                  stack: "Total2",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  data: planData,
                });
                break;
              default:
                break;
            }
          }
        }
        this.options3 = {
          title: {
            left: "0",
            top: "0",
            text: "中长期供电能力曲线",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
          legend: {
            data: legendData,
            bottom: "0%",
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
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          graphic: [
            {
              type: "text",
              left: "5",
              top: "30",
              style: {
                text: `更新时间：${nowTime}`,
                fill: "rgba(0,0,0,0.65)", // 文本颜色
                fontSize: 12,
              },
            },
          ],
          series: seriesData,
        };
      } catch (error) {}
    },
    changeTime3(params) {
      this.params3 = params;
      this.getEchartOptions3({
        [params.type]: params.value,
        type: [
          "windPowerList",
          "netPowerList",
          "exhaustPowerList",
          "loadFullDemand",
        ],
      });
    },
    async getTableList() {
      try {
        let res = await this.$API.ltlf.loadDistributePlan();
        res.data.loadDistributePlanDtos.map((item, index, arr) => {
          if (
            item.nextRenewTime.slice(0, 10) != arr[0].nextRenewTime.slice(0, 10)
          ) {
            item.isShowBadge = true;
          }
        });
        this.tableData = res.data.loadDistributePlanDtos;
        this.title = "负荷分配计划";
        this.time = res.data.nextRenewTime;
        this.$refs.myTableEdit.setOldData(this.tableData);
      } catch (error) {
        console.log(error);
      }
    },
    changeTableData(val) {
      this.tableData = val;
    },
    async getEcharts() {
      try {
        let data = {
          timeRangeType: "NEXT_24H_TIME",
          type: [/* "stove_a", "stove_b", "totalLoad", */  "supplyList"],
        };
        let options = await this.$API.ltlf.defaultGraphicDataByType(data);
        let xAxisData = [];

        let seriesData1 = [];
        let seriesData2 = [];
        let seriesData3 = [];
        let legendData = [];
        data.type.map((item) => {
          legendData.push(this.getName(item));
        });
        let stove_a = [],
          stove_b = [],
          totalLoad = [];
        this.tableData.map((item) => {
          xAxisData.push(item.nextRenewTime);
          stove_a.push([item.nextRenewTime, item.stoveA]);
          stove_b.push([item.nextRenewTime, item.stoveB]);
          totalLoad.push([item.nextRenewTime, item.stoveA + item.stoveB + 10]);
        });

        seriesData1.push({
          name: this.getName("stove_a"),
          type: "line",
          // stack: "Total",
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          emphasis: {
            focus: "series",
          },
          data: stove_a,
        });
        seriesData2.push({
          name: this.getName("stove_b"),
          type: "line",
          // stack: "Total",
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          emphasis: {
            focus: "series",
          },
          data: stove_b,
        });
        seriesData3.push({
          name: this.getName("totalLoad"),
          type: "line",
          // stack: "Total",
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          emphasis: {
            focus: "series",
          },
          data: totalLoad,
        });

        for (const key in options.data.stoveLineChartDtoMap) {
          if (
            Object.hasOwnProperty.call(options.data.stoveLineChartDtoMap, key)
          ) {
            const element = options.data.stoveLineChartDtoMap[key];
            let name = this.getName(key);
            switch (key) {
              case "stove_a":
                /* var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData1.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: historyData,
                }); */
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData1.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
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
                /* var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData2.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: historyData,
                }); */
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData2.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: planData,
                });

                break;
              case "totalLoad":
                /* var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData3.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: historyData,
                }); */
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData3.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  areaStyle: {},
                  showSymbol: false,
                  emphasis: {
                    focus: "series",
                  },
                  data: planData,
                });
                break;
              case "supplyList":
                /* var historyData = [];
                element.historyDataList.map((item) => {
                  historyData.push([item.x, item.y]);
                });
                seriesData3.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: historyData,
                }); */
                var planData = [];
                element.planDataList.map((item) => {
                  planData.push([item.x, item.y]);
                });
                seriesData3.push({
                  name: name,
                  type: "line",
                  // stack: "Total",
                  smooth: true,
                  showSymbol: false,
                  data: planData,
                });
                break;
              default:
                break;
            }
          }
        }
        this.options4 = {
          title: {
            left: "0",
            top: "0",
            text: "炉A",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: seriesData1,
        };
        this.options5 = {
          title: {
            left: "0",
            top: "0",
            text: "炉B",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: seriesData2,
        };
        this.options6 = {
          title: {
            left: "0",
            top: "0",
            text: "总负荷基线",
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
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
          legend: {
            data: legendData,
            bottom: "0%",
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
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: seriesData3,
        };
      } catch (error) {}
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    await this.getTableList();

    await this.getEcharts();
    // console.log(this.dictList);
    this.$eventBus.$on("changeTableData", async () => {
      await this.getTableList();
      await this.getEcharts();
      let params1 = this.params1;
      let params2 = this.params2;
      let params3 = this.params3;
      this.getEchartOptions1({
        [params1.type]: params1.value,
        type: ["stove_a", "stove_b", "supplyList", "loadFullDemand"],
      });
      this.getEchartOptions2({
        [params2.type]: params2.value,
        type: ["stove_a", "stove_b", "windPowerList", "adviceRangeTime"],
      });
      this.getEchartOptions3({
        [params3.type]: params3.value,
        type: [
          "windPowerList",
          "netPowerList",
          "exhaustPowerList",
          "loadFullDemand",
        ],
      });
    });
    this.$eventBus.$on("changeTableDatas", async () => {
      await this.getEcharts();
    });
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
  background: rgb(232, 242, 238);
  .left {
    .echarts-box {
      padding: 10px;
      box-sizing: border-box;
      background: #fff;
      margin-top: 20px;
      position: relative;
      .tools {
        position: absolute;
        z-index: 2;
        right: 20px;
        top: 20px;
        display: flex;
        align-items: center;
        /deep/ .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 124px;
        }
      }
    }
    .echarts-box:first-of-type {
      margin-top: 0;
    }
    .echarts {
      height: 280px;
    }
  }
  .right {
    background: #fff;
    .echarts {
      height: 205px;
      padding: 10px 0;
    }
  }
}
</style>