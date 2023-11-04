<template>
  <div id="banner">
    <h1>Make Your Monster!</h1>
  </div>
</template>

<script>
export default {
  name: "Banner"
}
</script>

<style scoped>
#banner {
  background-image: url('/public/img/burguer-bg.jpg');
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#banner h1{
  color: #fff;
  text-align: center;
  
  padding: 20px;
}
</style>
