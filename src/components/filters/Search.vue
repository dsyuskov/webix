<template>
  <div class="header-search">
    <input
      id="searchString"
      class="header-search__input"
      type="text"
      placeholder="Поиск"
      :value="searchString"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",

  data() {
    return {
      searchString: "",
    };
  },

  methods: {
    handleInput(event) {
      this.searchString = event.target.value;
      this.$emit('onchange')
    },
  },
};
</script>

<style lang="scss">
.header-search {
  &__input {
    border: 1px solid #eeeeee;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px;

    &:focus {
      border: 1px solid #aaaaaa;
    }
  }
}
</style>