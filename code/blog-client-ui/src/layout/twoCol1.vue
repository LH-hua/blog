<template>
    <div class="main">
      <v-container>
        <v-row no-gutters>
          <v-col cols="3" >
            <v-sheet class="pa-2 ma-2 " rounded elevation="2" > <slot name="side"></slot></v-sheet>
          </v-col>
          <v-col cols="9">
            <v-sheet class="pa-2 ma-2" rounded elevation="2"> <slot name="main"></slot> </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <style scoped>
  
  .main{
      width: 60%;
      margin: 0 auto;
  }
  .side{
    position: fixed;
  }
  
  </style>