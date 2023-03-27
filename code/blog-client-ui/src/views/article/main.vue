<template>
  <two-col>
    <template #main>
      <v-card
        v-for="item in state.data"
        :key="item"
        @click="ondetal(item)"
        density="compact"
        flat
      >
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ item.date }}</v-card-subtitle>
        <v-card-text>{{ item.descr }}</v-card-text>
        <v-card-actions><v-divider></v-divider></v-card-actions>
      </v-card>
    </template>
    <template #side>
      <v-card flat>
        <v-list>
          <v-list-subheader>REPORTS</v-list-subheader>

          <v-list-item
            v-for="(item, i) in state.items"
            :key="i"
            :value="item"
            active-color="primary"
            rounded="xl"
          >
            <!-- <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template> -->

            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </two-col>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { article } from "@/http/article";
const router = useRouter();
const state = reactive({
  data: [],
  items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
});

const ondetal = (obj) => {
  router.push({
    path: "post/" + obj._id,
  });
};

onMounted(() => {
  article().then((res) => {
    console.log(res);
    state.data = res.data.msg;
  });
});
</script>