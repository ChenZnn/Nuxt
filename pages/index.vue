<template>
  <div class="overflow-x-hidden">
    <Navbar ref="navbarRef" />
    
    <!-- Fond avec parallaxe -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm"></div>
      <div class="absolute w-full h-full">
        <div v-for="(bg, index) in backgrounds" :key="index" :class="bg.class"></div>
      </div>
    </div>

    <div class="relative min-h-screen pt-24 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- En-tête avec effet de profondeur -->
        <div class="text-center mb-20 relative">
          <h1 class="relative text-7xl font-black mb-8">
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight hover:scale-105 transform transition-transform duration-300">
              Bienvenue {{ isLoggedIn ? (user.name || user.username) : '' }}
            </span>
            <span class="block text-gray-800 mt-2">sur le Blog</span>
          </h1>
          <p class="relative text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {{ isLoggedIn ? 'Gérez vos articles préférés et partagez vos pensées !' : 'Explorez nos derniers articles et connectez-vous pour plus de fonctionnalités !' }}
          </p>
        </div>

        <!-- Liste des blogs affichés 3 par 3 -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"></div>
          
          <!-- Grid pour afficher les blogs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
            <div v-for="blog in orderedBlogs" :key="blog.id" 
                 class="group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 transform transition-all duration-500 hover:bg-white shadow-lg">
              <h2 class="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                {{ blog.title }}
              </h2>
              <p class="text-gray-600 mb-8 line-clamp-3 text-lg group-hover:text-gray-700 transition-colors duration-300">
                {{ blog.content }}
              </p>
              <NuxtLink :to="`/${blog.id}`" class="inline-flex items-center group/link" @click.prevent="selectBlog(blog)">
                <span class="relative text-lg font-semibold text-blue-600 group-hover/link:text-blue-800 transition-colors">
                  Lire la suite
                  <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from '../components/Navbar.vue';

const blogs = ref([
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
  },
]);

const orderedBlogs = ref([]);
const selectedBlog = ref(null);
const isLoggedIn = ref(false);
const user = ref({ username: '' });
const router = useRouter();

onMounted(() => {
  if (process.client) {
    isLoggedIn.value = !!localStorage.getItem("token");
    if (isLoggedIn.value) {
      user.value = JSON.parse(localStorage.getItem("user") || '{}');
      
      // Récupérer l'historique des blogs consultés
      const viewedBlogsHistory = JSON.parse(localStorage.getItem('viewedBlogsHistory') || '[]');
      
      if (viewedBlogsHistory.length > 0) {
        // Créer un tableau pour stocker les blogs dans l'ordre de l'historique
        const orderedBlogsArray = [];
        
        // D'abord ajouter les blogs de l'historique dans l'ordre
        viewedBlogsHistory.forEach(blogId => {
          const blog = blogs.value.find(b => b.id === parseInt(blogId));
          if (blog && !orderedBlogsArray.includes(blog)) {
            orderedBlogsArray.push(blog);
          }
        });
        
        // Ensuite ajouter les blogs qui ne sont pas dans l'historique
        blogs.value.forEach(blog => {
          if (!orderedBlogsArray.includes(blog)) {
            orderedBlogsArray.push(blog);
          }
        });
        
        orderedBlogs.value = orderedBlogsArray;
      } else {
        // Pour les utilisateurs connectés sans historique, afficher tous les articles triés par date
        const sortedBlogs = [...blogs.value].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        orderedBlogs.value = sortedBlogs;
      }
    } else {
      // Pour les utilisateurs non connectés, afficher uniquement les 3 articles les plus récents
      // Trier les blogs par date (du plus récent au plus ancien)
      const sortedBlogs = [...blogs.value].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      
      // Limiter aux 3 plus récents
      orderedBlogs.value = sortedBlogs.slice(0, 3);
    }
  }
});

const selectBlog = (blog) => {
  selectedBlog.value = blog.id;
  
  // Si l'utilisateur est connecté, on met à jour l'historique des blogs consultés
  if (isLoggedIn.value) {
    // Récupérer l'historique actuel
    let viewedBlogsHistory = JSON.parse(localStorage.getItem('viewedBlogsHistory') || '[]');
    
    // Supprimer l'ID du blog s'il existe déjà dans l'historique
    viewedBlogsHistory = viewedBlogsHistory.filter(id => id !== blog.id.toString());
    
    // Ajouter l'ID du blog en première position
    viewedBlogsHistory.unshift(blog.id.toString());
    
    // Limiter l'historique aux 20 derniers blogs consultés
    if (viewedBlogsHistory.length > 20) {
      viewedBlogsHistory = viewedBlogsHistory.slice(0, 20);
    }
    
    // Sauvegarder l'historique mis à jour
    localStorage.setItem('viewedBlogsHistory', JSON.stringify(viewedBlogsHistory));
    
    // Réorganiser les blogs dans l'interface
    const clickedBlog = blogs.value.find(b => b.id === blog.id);
    if (clickedBlog) {
      // Créer une nouvelle liste sans le blog cliqué
      const otherBlogs = orderedBlogs.value.filter(b => b.id !== blog.id);
      // Placer le blog cliqué en première position
      orderedBlogs.value = [clickedBlog, ...otherBlogs];
    }
  }
  
  router.push(`/${blog.id}`);
};

</script>

<style scoped>
.blog-list-move {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
