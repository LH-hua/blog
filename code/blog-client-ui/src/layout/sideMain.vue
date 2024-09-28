<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <slot name="main"></slot>
      </v-col>
      <v-col cols="3">
        <slot name="side"></slot>
        <v-sheet class="pa-5" style="margin-top: 10px">
          <ul>
            <li>copyright © lhgo 2024</li>
            <li>时光印记</li>
          </ul>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.container- {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

ul {
  list-style: none;
}
</style>
