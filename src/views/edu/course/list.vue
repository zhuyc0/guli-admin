<template>
  <div class="app-container">
    课程列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (courseQuery.page - 1) * courseQuery.limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称"/>

      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="80"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="viewCount" label="浏览数量" width="80"/>

      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">基本信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">课程大纲</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="courseQuery.page"
      :page-size="courseQuery.limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
  import course from '@/api/edu/course'

  export default {
    name: "course-list",
    data() { //定义变量和初始值
      return {
        list: null,//查询之后接口返回集合
        total: 0,//总记录数
        courseQuery: {
          title:'',
          status:'',
          page: 1,//当前页
          limit: 10,//每页记录数
        } //条件封装对象
      }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
      //调用
      this.getList()
    },
    methods: {  //创建具体的方法，调用teacher.js定义的方法
      //讲师列表的方法
      getList() {
        course.courseList(this.courseQuery)
          .then(response => {//请求成功
            //response接口返回的数据
            const {page} = response.data;
            if (page){
              this.total = page.total;
              this.list = page.records;
            }else {
              this.list = [];
            }
          })
      },
      resetData() {
        //清空的方法
        //表单输入项数据清空
        this.courseQuery = {}
        //查询所有讲师数据
        this.getList()
      },
      removeDataById(id){
        course.removeCourse(id).then(this.getList).catch(()=>{})
      }
    },

  }
</script>

<style scoped>

</style>
