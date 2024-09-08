<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        class="mx-auto"
        density="compact"
        variant="outlined"
        placeholder="输入搜索内容"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        flat
        rounded
        item-props
        v-model="data.serachValue"
        @click:clear="handlerClear"
        @keyup.enter="handlerEnter"
        @update:focused="focused"
      ></v-text-field>
    </template>
    <v-card>
      <v-toolbar density="compact" extended :extension-height="10" color="white">
        <v-toolbar-title>
          <div style="color: rgba(0, 0, 0, 0.5)">搜索历史</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="color: rgba(0, 0, 0, 0.5)" @click="clearHandler">
          清除
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-list-item v-for="item in data.historyItems" :key="item" @click="handlerChip(item)">{{ item }}</v-list-item>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import { reactive, defineEmits, onMounted } from 'vue'
import { userSearchFilters } from '@/store/dataStore'

const emit = defineEmits('search')

const serachFilters = userSearchFilters()
const data = reactive({
  serachValue: '',
  historyItems: [],
})


const clearHandler = () => {
  serachFilters.clear()
}
const focused = (boolean) => {
  if (boolean) {
    const history = serachFilters.history()
    data.historyItems = history
  }
}

function handlerChip(item) {
  data.serachValue = item
  handlerEnter()
}
async function handlerEnter() {
  // 键盘enter事件
  if (data.serachValue) {
    emit('search')
    await serachFilters.query({ title: data.serachValue })
    data.serachValue = ''
    // router.push('search')
  }
}
</script>
