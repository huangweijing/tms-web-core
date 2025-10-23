<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list nav density="comfortable">
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
      <v-list-item prepend-icon="mdi-account-multiple" title="人材管理" to="/personnel" />
      <v-list-item prepend-icon="mdi-school" title="スキル管理" to="/skill" />
      <v-list-item prepend-icon="mdi-book-open" title="問題管理" to="/questions" />
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts"></script>
