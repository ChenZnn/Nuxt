<template>
  <nav class="bg-white/80 backdrop-blur-sm shadow-md fixed w-full top-0 z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Nom du site -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            MonSite
          </span>
        </NuxtLink>

        <!-- Menu de navigation -->
        <div class="flex items-center space-x-4">
          <template v-if="auth.isLoggedIn">
            <span class="text-gray-600">{{ auth.username }}</span>
            <button 
              @click="handleLogout"
              class="bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
            >
              Se déconnecter
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/login"
              class="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Connexion
            </NuxtLink>
            <NuxtLink 
              to="/register"
              class="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Inscription
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = reactive({
  isLoggedIn: false,
  username: ''
});

onMounted(() => {
  checkAuthStatus();
});

// Vérifie le statut d'authentification
const checkAuthStatus = () => {
  if (process.client) {
    const token = localStorage.getItem('token');
    auth.isLoggedIn = !!token;
    
    if (auth.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      auth.username = user.name || user.username || 'Utilisateur';
    }
  }
};

// Gestion de la déconnexion
const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('blogsOrder');
    auth.isLoggedIn = false;
    auth.username = '';
    router.push('/');
    // Rafraîchir la page pour réinitialiser complètement l'état de l'application
    window.location.reload();
  }
};

// Exposer la méthode pour permettre la mise à jour depuis d'autres composants
defineExpose({
  checkAuthStatus
});
</script>
