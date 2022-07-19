<template>
  <div v-if="promiseState.loading">
    <img src="../assets/Rolling-1s-200px.gif" />
  </div>
  <div v-else-if="!promiseState.data">No data</div>
  <div v-else-if="promiseState.error && refresh()"></div>
  <div v-else><slot></slot></div>
</template>

<script>
export default {
  name: "PromiseNoData",
  props: ["promiseState"],
  emits: ["onRefresh"],
  methods: {
    refresh() {
      this.$emit("onRefresh");
    },
  },
};
</script>
