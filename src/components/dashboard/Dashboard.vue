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
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <div v-if="burger.opcionais && burger.opcionais.length > 0">
            <ul>
              <li v-for="(opcional, index) in burger.opcionais" :key="index">
                {{ opcional }}
              </li>
            </ul>
          </div>
          <div v-else>
            <strong>Sem opcionais</strong>
          </div>
        </div>
        <div>
          <select name="status" class="status">
            <option value="">Status</option>
            <option v-for="statusPedido in status" :key="statusPedido.id" :selected="burger.status == statusPedido.tipo"> 
              {{statusPedido.tipo}} 
            </option>
          </select>
          <button class="delete-btn" @click="deletePedidos(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
    };
  },
  methods: {
    async getPedidos() {
      const req = await fetch("http://localhost:3000/burgers");
      const data = await req.json();
      this.burgers = data;
      
      //Resgatando os status
      this.getStatus();
    },
    async getStatus(){
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      this.status = data;

    },
    async deletePedidos(id){
      const req = await fetch(`http://localhost:3000/burgers/${id}`,{
        method:"DELETE"
      });
      const res = await req.json();
      //flash mesagem

      this.getPedidos();
    }
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style scoped>
@import "style.css";
</style>