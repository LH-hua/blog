<template>
  <!-- <div> -->
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-avatar class="me-10 ms-4" color="grey-darken-1" size="40">LH</v-avatar>

      <v-spacer></v-spacer>
      <v-btn v-for="item in menu.data" :key="item" variant="text">
        {{ item.title }}
      </v-btn>

      <!-- <v-responsive max-width="260">
          <v-text-field
            density="compact"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-responsive> -->
    </v-container>
  </v-app-bar>

  <v-main class="bg-grey-lighten-3">
    <!-- <v-card>
            <v-card-title>fdsa</v-card-title>
        </v-card> -->
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet>
            <v-card flat>
              <v-img
                class="align-end text-white"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
              >
                <v-card-title>虽千万人，吾往矣</v-card-title>
              </v-img>

              <v-card-subtitle> Number 10 </v-card-subtitle>

              <v-card-text>
                <div>明天会更好</div>

                <div>明天会更好</div>
              </v-card-text>

              <!-- <v-card-actions>
                <v-btn color="orange"> Share </v-btn>

                <v-btn color="orange"> Explore </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <v-card title="fdsf" subtitle="fsdf" text="fdsafds" flat></v-card>
            <v-card title="fdsf" subtitle="fsdf" text="fdsafds" flat></v-card>
            <v-card title="fdsf" subtitle="fsdf" text="fdsafds" flat></v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-footer flat class="bg-black" height="20">
    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>LH</strong>
    </div>
  </v-footer>
  <!-- </div> -->
</template>

<script setup>
import { reactive } from "vue";
const menu = reactive({
  data: [
    {
      title: "首页",
      path: "",
    },
    {
      title: "室内场景",
      path: "",
    },
    {
      title: "室外场景",
      path: "",
    },
  ],
});
</script>
