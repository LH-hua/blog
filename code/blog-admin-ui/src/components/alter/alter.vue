<template>
    <div style="width:100%;height:100px">
        <v-alert v-if="state.isshow" title="Alert title" text="..." variant="tonal"></v-alert>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
const state = reactive({
    isshow:true
})

const open = () => {
    state.isshow = true
}
</script>