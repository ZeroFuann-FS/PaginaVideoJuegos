<template>
  <Header />
  <router-view />
  <Footer />
  <Chatbot />
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Chatbot from './components/Chatbot.vue'
</script>

<style>
/* Global styles can go here if needed, but most are in assets/styles.css */
</style>