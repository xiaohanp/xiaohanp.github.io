<template>
  <SignUpView
    @onRegister="register"
    @onSetEmail="setEmail"
    @onSetPassword="setPassword"
  />
</template>

<script>
import SignUpView from "../views/SignUpView.vue";

export default {
  components: { SignUpView },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {},
    setEmail(email) {
      this.email = email;
    },
    setPassword(password) {
      this.password = password;
    },
  },
  computed: {},
};
</script>

<style scoped></style>
