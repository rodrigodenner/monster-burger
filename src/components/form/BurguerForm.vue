<template>
  <div>
    <Message :msg="msg" :messageType="msgType" v-show="msg" />
    <form id="burger-form" method="POST" @submit="createBurger">
      <div class="input-container">
        <label for="nome">Nome do cliente:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          v-model="nome"
          placeholder="Digite o seu nome"
        />
      </div>
      <div class="input-container">
        <label for="pao">Escolha o pão:</label>
        <select name="pao" id="pao" v-model="pao">
          <option value="">Selecione o seu pão</option>
          <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
            {{ pao.tipo }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
            {{ carne.tipo }}
          </option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais"
          >Selecione os opcionais:</label
        >
        <div
          class="checkbox-container"
          v-for="opcional in opcionaisdata"
          :key="opcional.id"
        >
          <input
            type="checkbox"
            name="opcionais"
            v-model="opcionais"
            :value="opcional.tipo"
          />
          <span>{{ opcional.tipo }}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar meu Burger!" />
      </div>
    </form>
  </div>
</template>

<script>
import { getIngredientes, createBurger } from "@/service/apiService";
import Message from "../flashMessage/Message.vue";
import flashMessage from "@/assets/js/flashMessage";

export default {
  components: { Message },
  mixins: [flashMessage],
  name: "BurgerForm",
  data() {
    return {
      paes: null,
      carnes: null,
      opcionaisdata: null,
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null,
      msgType: null,
    };
  },
  methods: {
    async getIngredientes() {
      const data = await getIngredientes();
      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisdata = data.opcionais;
    },
    async createBurger(e) {
      e.preventDefault();

      // Verifique se todos os campos estão preenchidos
      if (!this.nome || !this.pao || !this.carne) {
        this.msgType = "danger";
        this.showFlashMessage("Por favor, preencha todos os campos.");
        return;
      }
      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opicionais: Array.from(this.opcionais),
        status: "Solicitado",
      };

      const res = await createBurger(data);

      const messageType = res.success ? "success" : "danger";
      this.msgType = messageType;

      // flash mensagem
      if (res) {
        this.msgType = "success";
        this.showFlashMessage("Pedido realizado com sucesso!");
        this.nome = "";
        this.carne = "";
        this.pao = "";
        this.opcionais = [];
      }
    },
  },
  mounted() {
    this.getIngredientes();
  },
};
</script>

<style scoped>
@import "style.css";
</style>