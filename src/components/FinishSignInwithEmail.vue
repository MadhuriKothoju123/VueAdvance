<script setup>
import { useAuthStore } from '../piniastore/auth';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
console.log(route);
console.log(route.params);

console.log( route.params.email);
onMounted(async () => {
  try {
    console.log(authStore.user);
    
    await authStore.completeSignIn(window.location.href);
    alert('Sign-in successful!');
    router.push('/dashboard');
  } catch (error) {
    alert('Error completing sign-in: ' + error.message);
    router.push('/login')
  }
});
</script>
