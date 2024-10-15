<template>
  <div class="container">
      <!-- <div class="sidenav"></div> -->
      <div class="body">
     <Header />
     <CategoryList />
     <router-view class="main-content"></router-view>
  </div>
  </div>
</template>
<script setup lang="ts">
import CategoryList from '../components/CategoryList.vue';
import Header from '../components/Header.vue';
import { onMounted } from 'vue';

onMounted(()=>{
  console.log("Hello")
})
</script>
<style scoped>
.container{
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.body{
  height: 100vh;
width: 100%;
  /* width: fit-content; */
display: flex;
flex-direction: column;

}
.sidenav{
  width: 15%;
  min-width: 226px;
  background-color: rgb(7, 7, 7);
  height: 100%;
}
.main-content{
  border-radius: 20px;
}


</style>