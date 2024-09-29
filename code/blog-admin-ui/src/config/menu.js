export const menu = [
  {
    parent: null,
    id: 0,
    text: '文章管理',
    icon: 'mdi-credit-card',
    scr: 'article',
    children: [
      {
        parent: 0,
        id: 0,
        text: '标签管理',
        icon: 'mdi-label',
        path: 'catptchs',
        scr: 'catptchs',
      },
      {
        parent: 0,
        id: 1,
        text: '文章列表',
        icon: 'mdi-format-list-bulleted',
        path: 'list',
        scr: 'list',
      },
      {
        parent: null,
        id: 2,
        text: '文章发布',
        icon: 'mdi-notebook-edit-outline',
        path: 'publish',
        scr: 'publish',
      },
    ],
  },
  {
    parent: null,
    id: 1,
    text: '作品管理',
    icon: 'mdi-compass-rose',
    path: 'preject',
    scr: 'preject',
  },
  {
    parent: null,
    id: 1,
    text: '系统管理',
    icon: 'mdi-cog',
    scr: 'system',
    children: [
      {
        parent: null,
        id: 1,
        text: '关于',
        icon: 'mdi-cog',
        path: 'about',
        scr: 'about',
      },
      {
        parent: null,
        id: 1,
        text: '菜单管理',
        icon: 'mdi-menu',
        path: 'menus',
        scr: 'menus',
      },
    ],
  },
]
