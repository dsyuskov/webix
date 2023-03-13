<template>
  <label for="favorites">
    <input
      id="favorites"
      type="checkbox"
      :checked="checked"
      @change="handleInput"
    />
    Только избранные
  </label>
</template>

<script>
export default {
  name: "HeaderFavorites",

  data() {
    return {
      checked: false,
    };
  },

  methods: {
    handleInput(event) {
      this.checked = event.target.checked;
      this.$emit("onchange");
    },
  },
};
</script>