<template>
  <div>
    <v-responsive class="border rounded" style="height: 87vh">
      <v-app>
        <v-navigation-drawer>
          <v-toolbar density="compact" title="根目录">
            <template #prepend>
              <v-btn density="compact" icon="mdi-plus"></v-btn>
            </template>
          </v-toolbar>
          <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <v-container>
            <h1>Main Content</h1>
          </v-container>
        </v-main>
      </v-app>
    </v-responsive>
  </div>
</template>
