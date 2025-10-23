
<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list nav density="comfortable">
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
      <v-list-item prepend-icon="mdi-account-multiple" title="Personnel" to="/personnel" />
      <v-list-item prepend-icon="mdi-school" title="Skills" to="/skill" />
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts"></script>
