<template>
  <div>
    <v-responsive class="border rounded" style="height: 87vh">
      <v-app>
        <v-navigation-drawer>
          <v-toolbar density="compact" title="根目录">
            <template #prepend>
              <v-dialog max-width="500" v-model="isActiveDialog">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" density="compact" icon="mdi-plus"></v-btn>
                </template>

                <template v-slot:default="{ isActiveDialog }">
                  <v-card title="增加根目录">
                    <v-card-text>
                      <v-text-field variant="outlined" v-model="rootName" placeholder="导航栏显示的名称">
                        <template #prepend>
                          <span style="width: 80px">名 称：</span>
                        </template>
                      </v-text-field>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text="确 定" color="success" @click="addRoot(isActiveDialog)"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-toolbar>
          <v-treeview :items="items" density="compact" item-title="name" item-value="_id" activatable @update:activated="activated"> </v-treeview>
        </v-navigation-drawer>
        <v-main>
          <v-toolbar density="compact">
            <v-btn v-bind="activatorProps" density="compact" icon="mdi-plus" v-tooltip:top="'添加子导航'"></v-btn>
            <div>{{ update.name }}</div>
          </v-toolbar>
          <v-container>
            <v-text-field variant="outlined" placeholder="导航栏显示的名称" v-model="update.name">
              <template #prepend>
                <span style="width: 80px">名 称：</span>
              </template>
            </v-text-field>
            <v-text-field variant="outlined" placeholder="导航地址" v-model="update.url">
              <template #prepend>
                <span style="width: 80px">地 址：</span>
              </template>
            </v-text-field>
            <v-text-field variant="outlined" placeholder="组件路径" v-model="update.path">
              <template #prepend>
                <span style="width: 80px">组 件：</span>
              </template>
            </v-text-field>
            <v-textarea variant="outlined" placeholder="关键字，利于SEO检索，越多越好，利于搜索引擎搜索" v-model="update.meta.keywords">
              <template #prepend>
                <span style="width: 80px">关键字：</span>
              </template>
            </v-textarea>
            <v-textarea variant="outlined" placeholder="对这个板块的描述，搜索引擎展示" v-model="update.meta.description">
              <template #prepend>
                <span style="width: 80px">描 述：</span>
              </template>
            </v-textarea>
            <div style="display: flex; gap: 10px">
              <v-switch color="success" inline inset indeterminate v-model="update.show">
                <template #prepend>
                  <span style="width: 80px">展 示：</span>
                </template>
              </v-switch>
              <v-switch color="success" inline inset indeterminate v-model="update.meta.isLogin">
                <template #prepend>
                  <span style="width: 150px">是否需要登录：</span>
                </template>
              </v-switch>
            </div>
            <v-btn variant="tonal" @click="SubmitEvent">提交修改</v-btn>
          </v-container>
        </v-main>
      </v-app>
    </v-responsive>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { get, post } from '../../http/http'

const isActiveDialog = ref(false)
const menusSource = ref([])
const items = ref([])

const rootName = ref('')
const update = ref({
  name: '',
  url: '',
  path: '',
  show: true,
  meta: {
    keywords: '',
    description: '',
  },
})

const addItemMenus = () => {
  console.log(update)
}
const activated = (_id) => {
  update.value = menusSource.value.filter((item) => item._id == _id[0])[0]
}

const SubmitEvent = () => {
  post('/api/admin/sys/menus/update', update.value).then((res) => {
    console.log(res)
  })
}
const addRoot = (item) => {
  post('api/admin/sys/menus/root/add', { name: rootName.value }).then((res) => {
    isActiveDialog.value = false
    query()
    rootName.value = ''
  })
}
const query = () => {
  get('api/admin/sys/menus/list').then((res) => {
    console.log(res)
    menusSource.value = res.data.data
    items.value = res.data.data
  })
}

onMounted(() => {
  query()
})
</script>
