
<template>
  <div id="app">
    <div class="header">
      <h2 class="header__title">Товары в категории</h2>
      <div class="header__filters">
        <div class="header__left">
          <header-search @onchange="applyFilter" />
          <header-favorites @onchange="applyFilter" />
        </div>
        <button class="header__button" @click="handleShowSettings">
          Настройка таблицы
        </button>
      </div>
    </div>
    <data-table id="data-table" :value="products" />
    <table-settings v-if="isShowSettings" @close="handleShowSettings" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import DataTable from "./components/DataTable/DataTable.vue";
import HeaderSearch from "./components/filters/Search.vue";
import TableSettings from "./components/TableSettings.vue";
import HeaderFavorites from "./components/filters/Favorites.vue";

import products from "./data/data.json";

export default {
  name: "App",

  components: {
    DataTable,
    HeaderSearch,
    TableSettings,
    HeaderFavorites,
  },

  data() {
    return {
      products,
      isShowSettings: false,
    };
  },

  methods: {
    handleShowSettings() {
      this.isShowSettings = !this.isShowSettings;
    },
    applyFilter() {
      $$("table").filterByAll();
    },
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1980px;
  margin: 0 auto;
}

.header {
  padding: 10px 0;

  &__title {
    margin: 0;
    margin-bottom: 16px;
  }

  &__filters {
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
    border: 1px solid #eeeeee;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
    padding-left: 30px;
    background: url("./assets/setting.svg") no-repeat left 10px center;
    background-size: 16px 16px;

    &:hover {
      cursor: pointer;
      border: 1px solid #aaaaaa;
    }
  }
}

.tooltip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  &__img {
    width: 300px;
  }
}

.favoriteButton {
  background: none;

  &:hover {
    cursor: pointer;
  }
}
</style>
