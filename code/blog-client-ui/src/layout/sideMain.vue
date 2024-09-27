<template>
  <v-container>
    <!-- <div class="container-">
      <div class="main">
        <slot name="main"></slot>
      </div>
      <div class="side">
        <slot name="side"></slot>
      </div>
    </div> -->
    <v-row>
      <v-col cols="9">
        <slot name="main"></slot>
      </v-col>
      <v-col cols="3">
        <slot name="side"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
/* @media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
} */
.container- {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
</style>
