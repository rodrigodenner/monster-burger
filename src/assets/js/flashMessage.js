export default {
  data() {
    return {
      msg: null,
    };
  },
  methods: {
    showFlashMessage(message) {
      this.msg = message;
      setTimeout(() => (this.msg = ""), 3000);
    },
  },
};