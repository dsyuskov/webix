<template>
  <div class="header-search"><input class="header-search__input" type="text" placeholder="Поиск"></div>
</template>

<script>
export default {
  name: "HeaderSearch",
};
</script>

<style lang="scss">
.header-search {
  &__input {
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px;

    &:focus {
      border: 1px solid #AAAAAA;
    }
  }
}
</style>