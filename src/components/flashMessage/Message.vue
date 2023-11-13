<template>
  <div :class="['message-container', messageType]">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String,
    messageType: String, 
  },
};
</script>

<style scoped>
@import "style.css";
</style>
