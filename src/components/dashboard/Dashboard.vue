<template>
  <div id="burger-table">
    <Message :msg="msg" :messageType="msgType" v-show="msg" />
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
            <div v-if="burger.opicionais && burger.opicionais.length > 0">
              <ul>
                <li v-for="(opcional, index) in burger.opicionais" :key="index">
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
import {
  getPedidos,
  getStatus,
  deletePedido,
  updateStatus,
} from "@/service/apiService";

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
      msgType: null,
    };
  },
  methods: {
    async getPedidos() {
      this.burgers = await getPedidos();
      this.getStatus();
    },

    async getStatus() {
      this.status = await getStatus();
    },

    async deletePedidos(id) {
      const res = await deletePedido(id);

      //flash mensagem
      const messageType = res.success ? "success" : "danger";
      this.msgType = messageType;

      this.msgType = "success";
      this.showFlashMessage("Pedido cancelado com sucesso!");

      this.getPedidos();
    },

    async updateStatus(event, id) {
      const option = event.target.value;
      const res = await updateStatus(id, option);

      //flash mensagem
      const messageType = res.success ? "success" : "danger";
      this.msgType = messageType;

      this.msgType = "success";
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