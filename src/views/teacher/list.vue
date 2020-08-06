<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="讲师"/> -->
        <el-autocomplete
          v-model="searchObj.name"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="讲师"
          value-key="name"
        />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.level"
          clearable
          placeholder="头衔"
        >
          <el-option
            value="1"
            label="高级讲师"
          />
          <el-option
            value="2"
            label="首席讲师"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="fetchData()"
        >查询</el-button>
        <el-button
          type="default"
          @click="resetData()"
        >清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 工具条 -->
    <div style="margin-bottom: 10px;">
      <el-button
        type="danger"
        size="mini"
        @click="batchRemove()"
      >批量删除</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      stripe
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" />

      <el-table-column
        label="#"
        width="50"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="80"
      />
      <el-table-column
        prop="level"
        label="头衔"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.level === 1"
            type="success"
          >高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2">首席讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="资历"
      />
      <el-table-column
        prop="sort"
        label="排序"
        width="60"
      />
      <el-table-column
        prop="joinDate"
        label="入驻时间"
        width="160"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"
    />
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";

export default {
  name: "teacher-list",
  data() {
    return {
      list: [], // 讲师列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      multipleSelection: [] // 批量选中的记录列表
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
      // 调用api模块，加载讲师列表
    fetchData() {
      teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },

    // 改编页码
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },

    // 改变每页记录数
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    // 删除记录
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacherApi.removeById(id)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 当表格中多选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 批量删除
    batchRemove() {
      // 判断是否选中记录
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录'
        })
        return
      }

      // 询问是否删除
      this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 拿到选中数据
        const idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        return teacherApi.batchRemove(idList)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 输入建议
    querySearch(queryString, callback) {
      teacherApi.selectNameListByKey(queryString).then(response => {
        callback(response.data.nameList)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>