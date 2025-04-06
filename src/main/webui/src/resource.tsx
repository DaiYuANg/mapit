const Resource = [
  {
    name: "project",
    list: "/project",
    create: "/project/create",
    edit: "/project/edit/:id",
    show: "/project/show/:id",
    meta: {
      canDelete: true,
    },
  },
  // {
  //   name: "categories",
  //   list: "/categories",
  //   create: "/categories/create",
  //   edit: "/categories/edit/:id",
  //   show: "/categories/show/:id",
  //   meta: {
  //     canDelete: true,
  //   },
  // },
]

export {Resource}