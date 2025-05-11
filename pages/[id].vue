<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <!-- Bouton retour -->
          <button @click="router.push('/')" class="mb-8 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Retour aux articles
          </button>

          <article class="prose prose-lg max-w-none">
            <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              {{ blog?.title }}
            </h1>
            
            <div class="flex items-center text-gray-500 mb-6 space-x-4">
              <div v-if="blog?.author" class="flex items-center">
                <span class="font-medium">{{ blog?.author }}</span>
              </div>
              <div v-if="blog?.date" class="flex items-center">
                <span>{{ blog?.date }}</span>
              </div>
            </div>
            
            <div v-if="blog?.tags && blog.tags.length > 0" class="flex flex-wrap gap-2 mb-8">
              <span v-for="tag in blog.tags" :key="tag" class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {{ tag }}
              </span>
            </div>
            
            <div class="text-gray-700 leading-relaxed space-y-6">
              {{ blog?.content }}
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';

// Middleware pour protéger la page
definePageMeta({
  middleware: "auth"
});

// Liste de blogs simulée avec plus de contenu
const blogs = [
  { 
    id: 1, 
    title: "🌟 L'art de la programmation", 
    content: "Découvrez les secrets des meilleurs développeurs pour écrire un code élégant et efficace. La programmation est bien plus qu'une simple écriture de code - c'est un art qui combine logique, créativité et résolution de problèmes. Dans cet article, nous explorons les principes fondamentaux qui distinguent un bon code d'un excellent code, les pratiques de refactoring essentielles, et comment penser comme un ingénieur logiciel expérimenté. Apprenez à structurer vos projets pour une maintenance optimale et découvrez pourquoi la simplicité est souvent la clé d'une solution robuste.",
    author: "Marie Dupont",
    date: "2023-11-15",
    tags: ["Programmation", "Bonnes pratiques", "Clean Code"]
  },
  { 
    id: 2, 
    title: "🔥 Intelligence Artificielle", 
    content: "Plongez dans le monde fascinant de l'IA et découvrez comment elle révolutionne notre quotidien. De l'apprentissage automatique aux réseaux de neurones profonds, cet article démystifie les concepts clés qui propulsent cette technologie transformative. Nous examinerons les applications concrètes de l'IA dans divers secteurs - de la santé à la finance, en passant par les transports et le divertissement. Quels sont les défis éthiques posés par ces avancées? Comment les entreprises peuvent-elles intégrer l'IA de manière responsable? Une exploration complète des opportunités et des questions que soulève cette révolution technologique.",
    author: "Thomas Martin",
    date: "2023-12-03",
    tags: ["IA", "Machine Learning", "Technologie"]
  },
  { 
    id: 3, 
    title: "🎯 Design moderne", 
    content: "Explorez les dernières tendances en UI/UX qui façonnent l'expérience utilisateur d'aujourd'hui. Le design n'a jamais été aussi crucial pour le succès d'un produit numérique. Cet article analyse les principes fondamentaux du design centré sur l'utilisateur et comment ils s'appliquent aux interfaces modernes. Du minimalisme au neumorphisme, en passant par les interfaces conversationnelles, découvrez comment ces approches influencent la perception et l'engagement des utilisateurs. Nous partagerons également des études de cas inspirantes et des outils pratiques pour améliorer vos propres créations. Un guide essentiel pour tout designer ou développeur soucieux de créer des expériences mémorables.",
    author: "Sophie Leclerc",
    date: "2023-10-22",
    tags: ["Design", "UI/UX", "Créativité"]
  },
  { 
    id: 4, 
    title: "🚀 Développement Web", 
    content: "Les outils et techniques pour créer des sites modernes qui captiveront votre audience. Le développement web évolue à une vitesse fulgurante, avec de nouveaux frameworks et méthodologies qui émergent constamment. Dans cet article approfondi, nous explorons l'écosystème actuel du développement frontend et backend, en mettant l'accent sur les technologies qui offrent le meilleur équilibre entre performance, maintenabilité et expérience développeur. De React à Vue, de Node.js à Deno, apprenez à naviguer dans ce paysage complexe et à faire des choix technologiques éclairés pour vos projets. Nous aborderons également les meilleures pratiques pour l'optimisation, le déploiement et la sécurité de vos applications web.",
    author: "Lucas Dubois",
    date: "2024-01-05",
    tags: ["Web", "JavaScript", "Frameworks"]
  },
  { 
    id: 5, 
    title: "💡 Innovation Technologique", 
    content: "Les dernières avancées technologiques à ne pas manquer et leur impact potentiel sur notre futur. L'innovation est le moteur du progrès, transformant radicalement industries et sociétés. Cet article explore les technologies émergentes les plus prometteuses - de l'informatique quantique à la réalité augmentée, en passant par la blockchain et la biotechnologie. Pour chaque domaine, nous analysons l'état actuel de la recherche, les applications concrètes déjà disponibles, et les perspectives d'évolution à court et moyen terme. Quelles innovations façonneront notre monde dans les prochaines décennies? Comment les entreprises peuvent-elles se préparer à ces changements disruptifs? Une exploration fascinante des frontières de la technologie moderne.",
    author: "Alexandre Chen",
    date: "2023-11-30",
    tags: ["Innovation", "Futur", "Technologie"]
  },
  { 
    id: 6, 
    title: "📱 Mobile & Applications", 
    content: "Comment les applications mobiles transforment notre quotidien et redéfinissent notre relation avec la technologie. Dans un monde où le smartphone est devenu une extension de nous-mêmes, les applications mobiles jouent un rôle central dans notre vie quotidienne. Cet article analyse l'évolution du développement mobile, des premières applications aux expériences immersives d'aujourd'hui. Nous explorons les tendances actuelles - du cross-platform au progressive web apps, en passant par l'intégration de fonctionnalités avancées comme la réalité augmentée et l'intelligence artificielle. Découvrez également les stratégies de conception et de monétisation qui distinguent les applications à succès, ainsi que les considérations essentielles en matière de confidentialité et d'expérience utilisateur.",
    author: "Émilie Rousseau",
    date: "2023-12-18",
    tags: ["Mobile", "Applications", "UX"]
  }
];

// Variables pour router et récupérer l'id du blog
const router = useRouter();
const route = useRoute();
const blog = ref(null);

// Vérification de la connexion
let isLoggedIn = false;
if (process.client) {
  isLoggedIn = localStorage.getItem('token') !== null;
}

onMounted(() => {
  const blogId = parseInt(route.params.id);
  blog.value = blogs.find(b => b.id === blogId) || null;

  if (!blog.value) {
    router.push('/');
    return;
  }
  
  // Si l'utilisateur est connecté, on sauvegarde l'ID du blog consulté
  if (isLoggedIn) {
    localStorage.setItem('lastViewedBlogId', blogId.toString());
  }
});
</script>

<style scoped>
.prose {
  max-width: none;
}

/* Animation de fondu */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

article {
  animation: fadeIn 0.6s ease-out;
}
</style>
