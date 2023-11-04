<template>
  <Navbar :logo="logo_src" :alt="app_name"/>
    <router-view/>
  <Footer/>
</template>
<script>
import Footer from './components/footer/Footer.vue'
import Navbar from './components/navbar/Navbar.vue'

export default {
  components:{
    Navbar,
    Footer
  },
  data() {
    return {
      logo_src:'/img/logo.png',
      app_name:'logo monster burguer',
    }
  },
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica;
}
.container{
  margin:50px;
  min-height: 250px;
}
h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}


</style>
