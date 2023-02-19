<template>
  <div>
    <v-app-bar title="" border flat>
      <slot name="header"></slot>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover >
      <slot name="side"></slot>
    </v-navigation-drawer>

    <v-main>
      <v-card flat>
        <v-card-text>
          <slot name="main"></slot>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>
  
  <script setup>
</script>