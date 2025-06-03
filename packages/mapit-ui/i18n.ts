import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'zh',
  fallbackLng: 'zh',
  resources: {
    zh: {
      translation: {
        ID: '编号',
        Name: '名称',
        'Are you sure?': '你确定吗？',
        Logout: '退出登录',
        Projects: '项目管理',
        Dictionaries: '字典管理',
        'Dictionary items': '字典项管理',
        Actions: '操作',
        Create: '新建',
        Edit: '编辑',
        Delete: '删除',
        Save: '保存',
        Cancel: '取消',
        // Refine官方key
        buttons: {
          create: '新建',
          edit: '编辑',
          delete: '删除',
          save: '保存',
          cancel: '取消',
          show: '查看',
          filter: '筛选',
          clear: '清空',
          export: '导出',
          refresh: '刷新',
        },
        actions: {
          edit: '编辑',
          show: '查看',
          delete: '删除',
        },
        table: {
          actions: '操作',
        },
      },
    },
  },
});

export default i18n;
