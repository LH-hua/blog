<template>
    <div>
      <v-app-bar title="积累塔后台系统" border flat>
        <slot name="header"></slot>
      </v-app-bar>
      <v-navigation-drawer expand-on-hover>
        <slot name="side"></slot>
        
      </v-navigation-drawer>
  
      <v-main>
        <slot name="main"></slot>
      </v-main>
    </div>
  </template>
  
  <script setup>
 
  </script>