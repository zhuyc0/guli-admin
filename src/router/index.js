import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },

  // 讲师管理
  {
    path: "/teacher",
    component: Layout,
    redirect: "/teacher/list",
    name: "Teacher",
    meta: { title: "讲师管理" },
    children: [
      {
        path: "list",
        name: "TeacherList",
        component: () => import("@/views/teacher/list"),
        meta: { title: "讲师列表" }
      },
      {
        path: "create",
        name: "TeacherCreate",
        component: () => import("@/views/teacher/form"),
        meta: { title: "添加讲师" }
      },
      {
        path: "edit/:id",
        name: "TeacherEdit",
        component: () => import("@/views/teacher/form"),
        meta: { title: "编辑讲师" },
        hidden: true
      }
    ]
  },

  // 课程分类管理
  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    name: "Subject",
    meta: { title: "课程分类管理" },
    children: [
      {
        path: "list",
        name: "SubjectList",
        component: () => import("@/views/subject/list"),
        meta: { title: "课程分类列表" }
      },
      {
        path: "import",
        name: "SubjectImport",
        component: () => import("@/views/subject/import"),
        meta: { title: "导入课程分类" }
      }
    ]
  },

  // 课程管理
  {
    path: "/course",
    component: Layout,
    redirect: "/course/list",
    name: "Course",
    meta: { title: "课程管理" },
    children: [
      {
        path: "list",
        name: "CourseList",
        component: () => import("@/views/course/list"),
        meta: { title: "课程列表" }
      },
      {
        path: "info",
        name: "CourseInfo",
        component: () => import("@/views/course/form"),
        meta: { title: "发布课程" }
      },
      {
        path: "info/:id",
        name: "CourseInfoEdit",
        component: () => import("@/views/course/form"),
        meta: { title: "编辑课程" },
        hidden: true
      },
      {
        path: "chapter/:id",
        name: "CourseChapterEdit",
        component: () => import("@/views/course/form"),
        meta: { title: "编辑课程大纲" },
        hidden: true
      }
    ]
  },

  {
    path: "/statistics",
    component: Layout,
    redirect: "/statistics/create",
    name: "Statistics",
    meta: { title: "统计分析" },
    children: [
      {
        path: "create",
        name: "StatisticsCreate",
        component: () => import("@/views/statistics/create"),
        meta: { title: "生成统计" }
      },
      {
        path: "chart",
        name: "StatisticsChart",
        component: () => import("@/views/statistics/chart"),
        meta: { title: "统计图表" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
