<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="large">
          <span class="text-h5">{{ data.user.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <span class="text-h5">{{ data.user.initials }}</span>
          </v-avatar>
          <h3>{{ data.user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ data.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded> Edit Account </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded> 退出 </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script setup>
import { reactive } from 'vue'
const data = reactive({
  user: {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
  },
})
</script>
