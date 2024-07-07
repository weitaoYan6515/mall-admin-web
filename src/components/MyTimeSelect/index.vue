<template>
  <div>
    <el-radio-group
      v-model="timeRangeType"
      fill="#0bb976"
      size="mini"
      @change="changeType('timeRangeType', $event)"
    >
      <el-radio-button
        v-for="item in timeSelectList"
        :label="item.value"
        :key="item.value"
        >{{ item.label }}</el-radio-button
      >
    </el-radio-group>
    <el-date-picker
      size="mini"
      v-model="searchTime"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      @change="changeTime('searchTime', $event)"
    >
    </el-date-picker>
  </div>
</template>
  
  <script>
import { parseTime } from "@/utils";
export default {
  components: {},
  //定义参数
  props: {},
  // 定义属性
  data() {
    return {
      searchTime: "",
      timeRangeType: "",
      timeSelectList: this.$global.timeSelectList,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    changeType(type, value) {
      let now = new Date();
      let yesterTime = parseTime(
        now.getTime() - 1000 * 60 * 60 * 24,
        "{y}-{m}-{d}"
      );
      let nowTime = parseTime(now, "{y}-{m}-{d}");
      if (value == "ROLL_24H_TIME") {
        this.searchTime = nowTime;
      } else if (value == "YESTERDAY_TIME") {
        this.searchTime = yesterTime;
      } else {
        this.searchTime = "";
      }
      this.$emit("change", { type, value });
    },
    changeTime(type, value) {
      if(!value){return}
      let now = new Date();
      let yesterTime = parseTime(
        now.getTime() - 1000 * 60 * 60 * 24,
        "{y}-{m}-{d}"
      );
      let nowTime = parseTime(now, "{y}-{m}-{d}");
      if (value == nowTime) {
        this.timeRangeType = "ROLL_24H_TIME";
        this.$emit("change", {
          type: "timeRangeType",
          value: this.timeRangeType,
        });
      } else if (value == yesterTime) {
        this.timeRangeType = "YESTERDAY_TIME";
        this.$emit("change", {
          type: "timeRangeType",
          value: this.timeRangeType,
        });
      } else {
        this.timeRangeType = "";
        this.$emit("change", { type, value:value + " 00:00:00" });
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.timeRangeType = "ROLL_24H_TIME";
    let now = new Date();
    this.searchTime = parseTime(now, "{y}-{m}-{d}");
    this.changeType("timeRangeType", this.timeRangeType);
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
</style>