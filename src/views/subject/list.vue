<template>
  <div class="app-container">

    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />

    <el-tree
      ref="tree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      style="margin-top:10px;"
    />
  </div>
</template>

<script>
import subjectApi from '@/api/subject'
export default {
  name: "subject-list",
  data() {
    return {
      filterText: "", // 过滤文本
      subjectList: [], // 数据列表
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  watch: {
    filterText(val) {
      //   console.log(val)
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.fetchNodeList();
  },
  methods: {
    fetchNodeList() {
      subjectApi.getNestedTreeList().then((response) => {
        this.subjectList = response.data.items;
      });
    },

    // 过滤节点
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>