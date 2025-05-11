<template>
  <div>
    <Navbar ref="navbarRef" />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <!-- Logo ou Titre -->
        <div class="text-center mb-10">
          <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Connexion
          </h1>
          <p class="mt-3 text-gray-600">Bienvenue ! Connectez-vous pour accéder à votre compte.</p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-2.5 w-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Entrez votre adresse email"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-2.5 w-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Entrez votre mot de passe"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div class="space-y-4 pt-2">
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all shadow-md hover:shadow-lg"
            >
              Se connecter
            </button>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-500">ou</span>
              </div>
            </div>

            <button
              type="button"
              @click="goToRegister"
              class="w-full bg-white text-gray-700 font-semibold py-2 px-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all"
            >
              Créer un compte
            </button>
          </div>
        </form>

        <!-- Lien retour -->
        <div class="mt-8 text-center">
          <button @click="router.push('/')" class="text-gray-600 hover:text-gray-800 transition-colors inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from '../components/Navbar.vue';

const email = ref("");
const password = ref("");
const router = useRouter();
const navbarRef = ref(null);

const handleLogin = async () => {
  try {
    // Préparation des données pour l'API Escuelas JS
    const loginData = {
      email: email.value,
      password: password.value
    };

    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Stocker le token d'accès
      localStorage.setItem("token", data.access_token);
      
      // Récupérer les informations de l'utilisateur avec le token
      const userResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { 
          "Authorization": `Bearer ${data.access_token}` 
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        // Stocker les informations utilisateur dans le même format que la page d'inscription
        localStorage.setItem("user", JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar
        }));
        
        // Mettre à jour l'état de la navbar
        navbarRef.value?.checkAuthStatus();
        
        // Ajouter la classe success pour l'animation
        document.querySelector('form').classList.add('success');
        
        alert('Connexion réussie!');
        router.push("/");
      } else {
        const errorData = await userResponse.json();
        alert(`Erreur lors de la récupération des informations utilisateur: ${errorData.message || 'Veuillez réessayer'}`);
      }
    } else {
      const errorData = await response.json();
      alert(`Erreur de connexion: ${errorData.message || 'Identifiants incorrects'}`);
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Erreur de connexion: " + error.message);
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
/* Animation de succès */
@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.success {
  animation: successPulse 0.5s ease-in-out;
}

/* Animation d'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

form {
  animation: fadeInUp 0.6s ease-out;
}

/* Transitions douces */
input, button {
  transition: all 0.3s ease;
}

/* Effet de glassmorphism */
.bg-white\/80 {
  backdrop-filter: blur(12px);
}
</style>
