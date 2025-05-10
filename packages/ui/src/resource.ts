const resource = [
  {
    name: "project",
    list: "/project",
    create: "/project/create",
    edit: "/project/edit/:id",
    show: "/project/show/:id",
    meta: {
      canDelete: true,
      label: '项目'
    },
  },
  {
    name: "dictionary",
    list: "/dictionary",
    create: "/dictionary/create",
    edit: "/dictionary/edit/:id",
    show: "/dictionary/show/:id",
    meta: {
      canDelete: true,
      label: '字典'
    },
  },
]

export {resource}