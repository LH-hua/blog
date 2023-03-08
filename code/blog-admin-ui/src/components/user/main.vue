
<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Activator slot
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        >
          <v-list-item-title>fdsafds</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- <v-btn
      color="primary"
    >
      1233
      <div>
        fdsaf
      </div>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            
          >
            <v-list-item-title>dsf</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn> -->

    <!-- <v-btn  icon="mdi-heart"  id="menu-activator">
      <v-avatar color="brown" size="large">
        <span class="text-h5">fsafsd</span>
      </v-avatar>
    </v-btn> -->
    <!-- <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          v-for="(item, index) in sate.items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script setup>
import { reactive } from "vue"

const sate = reactive({
  items: [
    { title: "Click Me" },
    { title: "Click Me" },
    { title: "Click Me" },
    { title: "Click Me 2" },
  ],
});
</script>