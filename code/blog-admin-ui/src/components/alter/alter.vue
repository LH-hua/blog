<template>
  <div class="container-alter">
    <Transition>
      <v-alert v-if="msg.isTrue" :title="msg.title" :text="msg.text" :color="msg.color" closable border="start"></v-alert>
    </Transition>
  </div>
</template>

<script setup>
import { usrMassegeStore } from '../../store/massege.js'
import { computed } from 'vue'

const msg = computed(() => {
  const massege = usrMassegeStore()
  console.log(massege.msg())
  return massege.msg()
})
</script>

<style scoped>
.container-alter {
  position: absolute;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
