<template>
  <SignInView
    @onLogIn="logIn"
    @onSetEmail="setEmail"
    @onSetPassword="setPassword"
  />
</template>

<script>
import SignInView from "../views/SignInView.vue";

export default {
  components: { SignInView },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logIn() {},
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
