<template>
  <div id="burger-table">
    <Message :msg="msg" v-show="msg" />
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
        </div>
        <div>
          <select
            name="status"
            class="status"
            @change="updateStatus($event, burger.id)"
          >
            <option
              v-for="statusPedido in status"
              :key="statusPedido.id"
              :velue="statusPedido.tipo"
              :selected="burger.status == statusPedido.tipo"
            >
              {{ statusPedido.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deletePedidos(burger.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "../flashMessage/Message.vue";
import flashMessage from "@/assets/js/flashMessage";
export default {
  name: "Dashboard",
  components: { Message },
  mixins: [flashMessage],
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null,
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
    async getStatus() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      this.status = data;
    },
    async deletePedidos(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });
      const res = await req.json();

      //flash mesagem

      this.showFlashMessage("Pedido deletado com sucesso!");

      this.getPedidos();
    },
    async updateStatus(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option });
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      //flash mesagem

      this.showFlashMessage(
        `Pedido Nº ${res.id} atualizado para ${res.status}!`
      );
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style scoped>
@import "style.css";
</style>