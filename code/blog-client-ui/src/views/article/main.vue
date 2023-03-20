<template>
  <two-col>
    <template #main>
        <v-card v-for="item in 3" :key="item" density="compact" flat>
          <v-card-title>标题</v-card-title>
          <v-card-subtitle>副标题</v-card-subtitle>
          <v-card-text>内容</v-card-text>
          <v-card-actions><v-divider></v-divider></v-card-actions>
        </v-card>
    </template>
    <template #side>
      <v-card flat> side </v-card>
    </template>
  </two-col>
</template>