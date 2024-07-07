<template>
  <div>
    <div class="head">
      <div class="title">{{ title }}</div>
      <div class="time" v-if="!isEdit">更新时间：{{ time }}</div>
      <div class="buttons" v-if="isEdit">
        <el-button type="cyan" size="mini" @click="download"
          >下载模板</el-button
        >
        <el-button type="cyan" size="mini" @click="upload">上传</el-button>
        <el-button type="cyan" size="mini" @click="confirm">保存</el-button>
        <el-button type="cyan" size="mini" @click="cancel">取消</el-button>
      </div>
      <div class="buttons" v-else>
        <el-button type="cyan" size="mini" @click="edit">修正</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="myTable"
        height="350"
        :border="border"
        :size="size"
        :data="tableData"
        style="width: 100%"
      >
        <template v-for="(item, index) in tableColumns">
          <el-table-column
            v-if="item.slotName"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align ? item.align : align"
            :header-align="
              item.headerAlign
                ? item.headerAlign
                : item.align
                ? item.align
                : align
            "
            :fixed="item.fixed"
            :fit="true"
            :show-overflow-tooltip="item.isShowTooltip"
          >
            <template slot-scope="{ row }">
              <slot :name="item.slotName" :data="row" />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align ? item.align : align"
            :header-align="
              item.headerAlign
                ? item.headerAlign
                : item.align
                ? item.align
                : align
            "
            :fixed="item.fixed"
            :fit="true"
            :show-overflow-tooltip="item.isShowTooltip"
          >
            <template slot-scope="{ row }">
              <div v-if="item.noEdit">
                <span class="row">{{ row[item.prop] }}</span>
              </div>
              <div v-else>
                <div v-if="isEdit">
                  <el-input size="mini" v-model="row[item.prop]" @blur="blur"> </el-input>
                </div>
                <div v-else>
                  <span class="row">{{ row[item.prop] }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="echarts">
      <div></div>
    </div>
    <div v-show="false">
      <input ref="upload" type="file" accept=".xlsx" @change="changeFile" />
    </div>
  </div>
</template>
  
  <script>
import { deepClone } from "@/utils";
export default {
  components: {},
  name: "MyTableEdit",
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "mini",
    },
    align: {
      type: String,
      default: "center",
    },
    tableColumns: {
      type: Array,
      default: () => {
        return [
          {
            label: "skuId",
            prop: "skuId",
          },
          {
            label: "商品名称",
            prop: "skuName",
          },
          {
            label: "缩略图",
            slotName: "thumbnail",
          },
          {
            label: "库存数量",
            prop: "onStockNum",
          },
          {
            label: "码类型",
            prop: "hasUniCode",
          },
          {
            label: "状态",
            prop: "status",
            slotName: "status",
          },
          {
            label: "操作",
            slotName: "operation",
          },
        ];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            skuId: "111",
            skuName: "222",
          },
        ];
      },
    },
    title: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isEdit: false,
      oldData: {},
      //   tableData:[],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  methods: {
    setOldData(data) {
      this.oldData = deepClone(data);
    },
    download() {
      this.$API.ltlf.exportExcel();
    },
    upload() {
      this.$refs.upload.click();
    },
    async changeFile(e) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      await this.$API.ltlf.importExcel(formData);
      this.$message({
        message: "提交成功",
        type: "success",
      });
      this.$eventBus.$emit('changeTableData')
    },
    blur(){
      this.$eventBus.$emit('changeTableDataBlur')
    },
    async confirm() {
      this.isEdit = false;
      console.log(this.tableData);
      await this.$API.ltlf.saveTable(this.tableData);
      this.$eventBus.$emit('changeTableDataConfirm')
    },
    cancel() {
      this.isEdit = false;
      // this.$emit("changeTableData", deepClone(this.oldData));
      this.$eventBus.$emit('changeTableDataCancel')
    },
    edit() {
      this.isEdit = true;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
};
</script>
  <style lang="scss" scope>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  .title {
    margin-left: 5px;
    font-weight: bolder;
    font-size: 16px;
    color: rgba(16, 16, 16, 1);
  }
  .time {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
<style>
.table .el-table .cell {
  overflow: inherit;
}
</style>
  