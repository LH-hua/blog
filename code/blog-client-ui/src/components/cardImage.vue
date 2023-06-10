<template>
  <v-sheet>
    <v-card flat>
      <v-card-title>
        <!-- <v-img
          class="align-end text-white"
          height="100"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        >
          
        </v-img> -->
        <div
          style="
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          "
        >
          <v-avatar
            image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-avatar>
          <span>LH-hua</span>
          <span>生活不止有今天的麻烦，还有明天的烦恼</span>
        </div>
      </v-card-title>

      <!-- <v-card-subtitle> L H </v-card-subtitle> -->

      <v-card-text>
        <!-- <div>明天会更好</div>

        <div>一个乐于分享的网站</div> -->
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="flex-grow-1 grey-lighten-2" color="#EEEEEE" variant="flat">
          <v-icon icon="mdi-github"></v-icon>
        </v-btn>
        <v-btn class="flex-grow-1 grey-lighten-2" color="#EEEEEE" variant="flat">
          <v-icon icon="mdi-account"></v-icon>
        </v-btn>
      </template>
    </v-card>
  </v-sheet>
</template>
