<template>
  <div class="container-fluid">
    <a href="/art-music" class="btn btn-lg"
      ><q-icon name="mdi-arrow-left" /> Back to Explore Page</a
    >
    <div class="row py-5">
      <div class="col-md-6 py-5 text-center">
        <h2 class="mb-3 form-title">Sign Up</h2>

        <div class="mt-5">
          <input
            type="text"
            v-on:input="setEmail"
            class="form-control mx-auto"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            style="width: 80%"
          />
        </div>
        <div class="my-3">
          <input
            type="password"
            v-on:input="setPassword"
            class="form-control mx-auto"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            style="width: 80%"
          />
        </div>

        <button
          @click="register"
          value="Sign Up"
          class="my-5 btn btn-outline-dark"
        >
          Sign Up
        </button>
      </div>
      <div class="col-md-6 text-center my-5">
        <div class="signin-image">
          <figure class="container">
            <img
              style="max-width: 50%"
              class="img-fluid rounded mx-auto d-block"
              src="../assets/images/signup-image.jpg"
              alt="sing up image"
            />
          </figure>
          <a href="/sign-in" class="btn-outline-dark btn py-1 btn-block"
            >I am already member</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["onRegister", "onSetEmail", "onSetPassword"],
  mounted() {},
  methods: {
    register() {
      this.$emit("onRegister");
    },
    setEmail(evt) {
      this.$emit("onSetEmail", evt.target.value);
    },
    setPassword(evt) {
      this.$emit("onSetPassword", evt.target.value);
    },
  },
};
</script>
