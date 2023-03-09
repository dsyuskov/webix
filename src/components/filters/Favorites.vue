<template>
  <div class="favorites">
    <label for="favorites">
      <input
        id="favorites"
        type="checkbox"
        :checked="checked"
        @click="handleInput"
      />
      Только избранные
    </label>
  </div>
</template>

<script>
export default {
  name: "HeaderFavorites",

  data() {
    return {
      checked: false
    };
  },

  methods: {
    handleInput(event) {
      this.checked = event.target.checked;
      this.$emit('onchange')
    },
  },
};
</script>