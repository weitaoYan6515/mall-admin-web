<template>
  <div>
    <el-table
      ref="myTable"
      :border="border"
      :size="size"
      :data="tableData"
      :row-key="rowKey"
      :tree-props="treeProps"
      style="width: 100%"
      highlight-current-row
      @header-dragend="headerDragend"
      @current-change="selectChange"
      @selection-change="multipleSelectChange"
      @row-contextmenu="rightClick"
    >
      <template v-for="(item, index) in tableColumns">
        <template v-if="item.type">
          <el-table-column
            :key="index"
            :type="item.type"
            :label="item.label"
            :width="item.width"
            :align="item.align ? item.align : align"
            :header-align="item.headerAlign ? item.headerAlign : item.align ? item.align : align"
            :fixed="item.fixed"
          />
        </template>
        <template v-else>
          <el-table-column
            v-if="item.slotName"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align ? item.align : align"
            :header-align="item.headerAlign ? item.headerAlign : item.align ? item.align : align"
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
            :header-align="item.headerAlign ? item.headerAlign : item.align ? item.align : align"
            :fixed="item.fixed"
            :fit="true"
            :show-overflow-tooltip="item.isShowTooltip"
          />
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  components: {},
  name: "MyTable",
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'mini',
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
    rowKey: {
      type: String,
      default: "",
    },
    treeProps: {
      type: Object,
      default: () => {},
    },
    align: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {};
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 当页面刷新时，若本地存储中存的有表头数组信息，就用本地的。当然第一次本地是没有的
    if (sessionStorage.getItem("tableHeader")) {
      this.tableHeader = JSON.parse(sessionStorage.getItem("tableHeader"));
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  methods: {
    //需要开启border
    // 表头拖动事件
    headerDragend(newWidth, oldWidth, column, event) {
      // 饿了么UI中提供的有对应参数，主要用到的是newWidth和column.property
      // console.log(newWidth, oldWidth, column, event);
      // 根据column中的信息就可以知道用户拖动的是哪一列，从而将新的列宽度替换原来的列宽度
      let newTableHeader = this.tableHeader.map((item, index) => {
        if (item.propName == column.property) {
          item.width = newWidth;
        }
        return item;
      });

      // 最后存一份到本地，当刷新的时候，就用本地的这个记录了用户拖动宽度的表头数组数据
      sessionStorage.setItem("tableHeader", JSON.stringify(newTableHeader));
    },
    select(index) {
      // console.log(index,this.tableData)
      this.$refs.myTable.setCurrentRow(this.tableData[index]);
    },
    selectChange(row) {
      // console.log(row);
      this.$emit("selectChange", row);
    },
    multipleSelectChange() {
      // console.log(this.$refs.myTable.selection)
      this.$emit("getMultipleSelect", this.$refs.myTable.selection);
    },
    rightClick(row) {
      // console.log(row);
      event.preventDefault();
    },
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scope>
/* // 点击的时候添加的class样式
.el-table__body tr.current-row > td {
  // background-color: #69A8EA !important;
  background-color: #1f2d3da1 !important;
  color: #fff;
} */
</style>
