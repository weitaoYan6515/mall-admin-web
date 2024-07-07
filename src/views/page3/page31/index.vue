<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="progress-box clearfix">
          <el-col :span="8" v-for="(item, index) in progressList" :key="index">
            <div class="progress">
              <div class="left">
                <el-progress
                  type="circle"
                  :percentage="item.percentage"
                ></el-progress>
              </div>
              <div class="right">
                <div class="title">{{ item.title }}</div>
                <div class="value">{{ item.value }}</div>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="tag-box clearfix">
          <el-col :span="12" v-for="(item, index) in tagList" :key="index">
            <div class="tag">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="value">{{ item.value }}</div>
              </div>
              <div class="right"></div>
            </div>
          </el-col></div
      ></el-col>
      <el-col :span="24">
        <div class="table-box">
          <div class="table">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :default-sort="{ prop: 'name', order: 'descending' }"
            >
              <el-table-column prop="name" label="项目名称" sortable>
              </el-table-column>
              <el-table-column label="管理员" sortable prop="account">
                <el-table-column prop="account" label="主账号"> </el-table-column>
                <el-table-column prop="account" label="主账号"> </el-table-column>
              </el-table-column>
              <el-table-column prop="createTime" sortable label="创建时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {
      progressList: [
        {
          percentage: 0,
          title: "今日剩余任务总数",
          value: 4,
        },
        {
          percentage: 25,
          title: "今日剩余日前任务数",
          value: 3,
        },
        {
          percentage: 50,
          title: "今日剩余中长期任务数",
          value: 1,
        },
      ],
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
      ],
      tableData: [
        {
          createTime: "2016-05-02",
          name: "文件名.txt",
          account: "11,22",
        },
        {
          createTime: "2016-05-04",
          name: "文件名.txt",
          account: "11,22",
        },
        {
          createTime: "2016-05-01",
          name: "文件名.txt",
          account: "11,22",
        },
        {
          createTime: "2016-05-03",
          name: "文件名.txt",
          account: "11,22",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 100,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    formatter(row, column) {
      return row.account;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpcreateTime() {}, // 生命周期 - 更新之前
  upcreateTimed() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
.app-container {
  .progress-box {
    height: 150px;
    display: flex;
    align-items: center;
    .progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .value {
          margin-top: 5px;
          font-size: 16px;
          color: #aeaeb2;
          font-weight: bold;
        }
      }
    }
  }
  .tag-box {
    height: 150px;
    display: flex;
    align-items: center;
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
  }
  .table-box{
    margin-top: 30px;
    .pagination{
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>