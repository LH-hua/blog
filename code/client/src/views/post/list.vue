<template>
  <layout>
    <template #main>
      <br />
      <v-sheet :height="200" :rounded="'lg'"></v-sheet>
    </template>
    <template #side>
      <br />
      <v-sheet :rounded="'lg'">
        <v-card flat>
          <v-card-title><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title>
          <v-card-text>
            <p>这是LH个人博客，记录和分享日常</p>
            <p>有问题欢迎讨论交流</p>
          </v-card-text>
        </v-card>
      </v-sheet>
    </template>
  </layout>
</template>
