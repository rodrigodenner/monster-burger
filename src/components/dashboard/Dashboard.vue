<template>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Status</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row">
        <div class="order-number">1</div>
        <div>Rodrigo</div>
        <div>Pão doce</div>
        <div>Picanha</div>
        <div>
          <ul>
            <li>Salame</li>
            <li>Tomate</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status">
            <option value="">Status</option>
          </select>
          <button class="delete-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  },
};
</script>

<style scoped>
  @import "style.css";
</style>