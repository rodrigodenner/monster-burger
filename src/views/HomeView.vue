<template>
<MainBanner/>
  <div class="container">
    <h1>Monte seu hamburguer</h1>
    <BurguerForm/>
  </div>
</template>

<script>
import MainBanner from '@/components/banner/MainBanner.vue'
import BurguerForm from '@/components/form/BurguerForm.vue'
export default {
  name:"Home",
  components: { 
    MainBanner,
    BurguerForm,
  },
  
}
</script>

