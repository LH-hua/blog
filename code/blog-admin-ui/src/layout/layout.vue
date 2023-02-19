<template>
  <div>
    <v-navigation-drawer expand-on-hover  rail="true">
      <div style="height:64px">积雷塔后台系统</div>
      <slot name="side"></slot>
    </v-navigation-drawer>
    <v-app-bar title="" border flat>
      <slot name="header"></slot>
    </v-app-bar>
    

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