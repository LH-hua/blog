<template>
  <div style="background-color: #eff3f6;">
    <v-navigation-drawer expand-on-hover class="elevation-3" floating name="app-navigation">
      <div class="pa-2">
        <div class="title font-weight-bold text-uppercase text-primary">test</div>
        <div class="overline text-grey">1</div>
      </div>
      <slot name="side"></slot>
    </v-navigation-drawer>
    <v-app-bar title="" class="elevation-3">
      <slot name="header"></slot>
    </v-app-bar>

    <v-main>
      <v-container class="h-100">
        <slot name="main"></slot>
      </v-container>
      <!-- <v-card flat>
        <v-card-text>
          <slot name="main"></slot>
        </v-card-text>
      </v-card> -->
    </v-main>
    <v-footer app>
      <div class="overline">
        <v-icon small color="pink">mdi-github</v-icon>
        <a class="text-decoration-none" href="https://github.com/" target="_blank">LH</a>
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script setup></script>
