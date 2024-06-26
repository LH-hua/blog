<template>
  <v-container>
    <!-- <div style="position: relative;"> -->
    <v-row>

      <v-col cols="9">
        <slot name="main"></slot>
      </v-col>
      <v-col cols="3">
        <slot name="right"></slot>
      </v-col>
    </v-row>
    <!-- </div> -->
  </v-container>
</template>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
