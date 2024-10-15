<template>
    <div  class="dashbaord">
      <SortAndFilterProducts />
      <div  > Hello</div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(()=>{
    console.log('mounted');
})
</script>
<style scoped lang="scss">
  .dashboard{
    display: flex;
    flex-direction: column;
    
  }
</style>