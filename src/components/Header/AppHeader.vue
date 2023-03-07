<template>
  <header class="header">
    <h2 class="header__title">Товары в категории</h2>
    <div class="header__actions">
      <div class="header__left">
        <header-search />
        <header-favorites />
      </div>
      <button class="header__button">Настройка таблицы</button>
    </div>
  </header>
</template>

<script>
import HeaderSearch from "./Search.vue";
import HeaderFavorites from "./Favorites.vue";

export default {
  name: "AppHeader",

  components: {
    HeaderSearch,
    HeaderFavorites,
  },
};
</script>

<style lang="scss">
.header {
  padding: 10px 0;

  &__title {
    margin: 0;
    margin-bottom: 10px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__button {
    background: none;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px;

    &:hover {
      cursor: pointer;
      border: 1px solid #AAAAAA;
    }
  }
}
</style>