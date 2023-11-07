<template>
  <div>
    <p>Flash mensage</p>
    <div>
      <form  id="burguer-form">
        <div class="input-container">
          <label for="name">Nome do cliente: </label>
          <input v-model="nome" type="text" placeholder="Nome do Cliente"/>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o seu pão: </label>
          <select v-model="pao" name="pao" id="pao">
            <option value="">Selecione o seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo"> {{pao.tipo}} </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Escolha sua carne: </label>
          <select v-model="carne" name="carne" id="carne">
            <option value="">Selecione a sua carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo"> {{carne.tipo}} </option>
          </select>
        </div>
        <div class="input-container" id="opcionais-container">
          <label id="opcionais-title" for="opcionais">Selecione os opicionais: </label>
          <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id" >
            <input v-model="opcionais" type="checkbox" name="opcionais" :value="opcional.tipo">
            <span>{{opcional.tipo}}</span>
          </div>
        </div>
        <div class="input-container">
          <input class="submit-btn" type="submit" value="Criar meu Burguer">
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BurguerForm',
  data () {
    return {
      paes:null,
      carnes:null,
      opcionaisdata:null,
      nome:null,
      pao:null,
      carne:null,
      opcionais:[],
      status:"Solicitado",
      msg:null
    }
  },
  methods: {
   async getIngredientes() {
      const req = await fetch('http://localhost:3000/ingredientes')
      const data = await req.json()

      this.paes = data.paes
      this.carnes = data.carnes
      this.opcionaisdata = data.opcionais
   }
  },
  mounted() {
     this.getIngredientes()
  },
}
</script>

<style scoped>

@import 'style.css'

</style>