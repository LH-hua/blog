export const menu = [
    {
        parent: null,
        id: 0,
        text: "文章",
        icon: "mdi-clock",
        path: "article",
        scr:"article",
        chilren: [],
    },
    {
        parent: null,
        id: 1,
        text: "用户",
        icon: "mdi-account",
        path: "user",
        scr:"user",
        chilren: [
            {
                parent: null,
                id: 1,
                text: "Audience",
                icon: "mdi-account",
                path: "test",
                scr:"test",
                chilren: [],
            },
        ],
    },
    {
        parent: null,
        id: 2,
        text: "Conversions",
        icon: "mdi-flag",
        path: "test",
        scr:"test",
        chilren: [
            {
                parent: null,
                id: 2,
                text: "Conversions",
                icon: "mdi-flag",
                path: "test",
                scr:"test",
                chilren: [],
            },
        ],
    },
]