import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'home' },
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '中长期生产计划', icon: 'dashboard' }
    },
      // {
      //   name: 'document',
      //   path: 'https://www.macrozheng.com',
      //   meta: {title: '学习教程', icon: 'document'}
      // },
      // {
      //   name: 'video',
      //   path: 'https://www.macrozheng.com/mall/catalog/mall_video.html',
      //   meta: {title: '视频教程', icon: 'video'}
      // },
    ]
  }
]

export const asyncRouterMap = [
  /* {
    path: '/ltlf',
    component: Layout,
    redirect: '/ltlf/ltlf',
    name: 'ltlf',
    meta: { title: '中长期生产计划', icon: 'product' },
    children: [
      {
        path: 'ltlf',
        name: 'ltlfIndex',
        component: () => import('@/views/ltlf/ltlf/index'),
        meta: { title: '中长期生产计划', icon: 'product' }
      },
    ]
  }, */
 /*  {
    path: '/page1',
    component: Layout,
    redirect: '/page1/page11',
    name: 'page1',
    meta: { title: '中长期生产计划', icon: 'product' },
    children: [
      {
        path: 'page11',
        name: 'page11',
        component: () => import('@/views/page1/page11'),
        meta: { title: '中长期生产计划', icon: 'product' }
      },
    ]
  }, */
  {
    path: '/page2',
    component: Layout,
    redirect: '/page2/page21',
    name: 'page2',
    meta: { title: '日前生产计划', icon: 'product' },
    children: [
      {
        path: 'page21',
        name: 'page21',
        component: () => import('@/views/page2/page21'),
        meta: { title: '日前生产计划', icon: 'product' }
      },
      {
        path: 'page22',
        name: 'page22',
        component: () => import('@/views/page2/page22'),
        meta: { title: '主控员视图', icon: 'product' }
      },
    ]
  },
  {
    path: '/page3',
    component: Layout,
    redirect: '/page3/page31',
    name: 'page3',
    meta: { title: '管理中心', icon: 'product' },
    children: [
      {
        path: 'page31',
        name: 'page31',
        component: () => import('@/views/page3/page31'),
        meta: { title: '管理中心', icon: 'product' }
      },
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: { title: '权限', icon: 'ums' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: { title: '用户列表', icon: 'ums-admin' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: { title: '角色列表', icon: 'ums-role' }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: { title: '分配菜单' },
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: { title: '分配资源' },
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: { title: '菜单列表', icon: 'ums-menu' }
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: { title: '添加菜单' },
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: { title: '修改菜单' },
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: { title: '资源列表', icon: 'ums-resource' }
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: { title: '资源分类' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

