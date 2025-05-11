<template>
    <div class="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow cursor-pointer" @click="goToBlog">
      <h3 class="text-xl font-semibold text-blue-600">{{ blog.title }}</h3>
      <p class="text-gray-700 mt-2">{{ blog.content.substring(0, 100) }}...</p>
      <div class="mt-4 text-blue-500 hover:text-blue-700">Lire plus</div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    blog: Object
  });
  
  const router = useRouter();
  
  const goToBlog = () => {
    router.push(`/blog/${props.blog.id}`);
  };
  </script>
  
  <style scoped>
  /* Style pour les cartes de blog */
  </style>
