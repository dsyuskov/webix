
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
    <data-table
      id="data-table"
      :config="table"
      :value="$options.products"
      class="table"
    />
    <table-settings
      v-if="isShowSettings"
      :columns="table.columns"
      @close="handleShowSettings"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import DataTable from "./components/DataTable.vue";
import LikesIcon from "./components/LikesIcon.js";
import ImageTooltip from "./components/ImageTooltip";
import HeaderSearch from "./components/filters/Search.vue";
import TableSettings from "./components/TableSettings.vue";
import HeaderFavorites from "./components/filters/Favorites.vue";

import products from "./data/data.json";

const saveConfiguration = () => {
  webix.storage.local.put("tableSettings", webix.$$("table").getState());
};

export default {
  name: "App",

  components: {
    DataTable,
    HeaderSearch,
    TableSettings,
    HeaderFavorites,
  },

  products,

  data() {
    return {
      isShowSettings: false,
      table: {
        view: "datatable",
        id: "table",
        autoheight: true,
        autowidth: true,
        dragColumn: "order",
        resizeColumn: true,
        pager: {
          size: 10,
          group: 5,
        },
        tooltip: { template: "" },
        columns: [
          {
            id: "loosesPercent",
            sort: "int",
            header: [
              { text: "Упущен", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
          },
          {
            id: "position",
            sort: "int",
            header: [
              { text: "Позиция", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
          },
          {
            id: "picture",
            header: [
              { text: "Фото", css: "table__header" },
              { text: "", css: "table__header" },
            ],
            template: (item) =>
              `<img class="table__img" src="./assets/images/thumbs/${item.picture}">`,
            tooltip: (item) => ImageTooltip(item.picture),
          },
          {
            id: "sku",
            sort: "string",
            header: [
              { text: "Артикул" },
              { content: "textFilter", colspan: 2, css: "table__header" },
            ],
          },
          {
            id: "isFavorite",
            sort: "string",
            header: [
              { text: "", css: "table__header" },
              { text: "", css: "table__header" },
            ],
            width: 60,
            template: (item) => LikesIcon(item.isFavorite),
          },
          {
            id: "chartSales",
            sort: "string",
            header: [{ text: "График продаж" }, ""],
            template: webix.Sparklines.getTemplate({
              type: "bar",
              paddingX: 0,
              width: 6,
            }),
            width: 200,
          },
          {
            id: "product",
            sort: "string",
            header: [{ text: "Товар" }, { content: "textFilter" }],
            fillspace:true
          },
          {
            id: "brand",
            sort: "string",
            header: [{ text: "Бренд" }, { content: "textFilter" }],
          },
          {
            id: "merchant",
            sort: "string",
            header: [{ text: "Продавец" }, { content: "textFilter" }],
          },
          {
            id: "group",
            sort: "string",
            header: [{ text: "Группа" }, { content: "multiComboFilter" }],
            width: 150,
          },
          {
            id: "remains",
            sort: "int",
            header: [{ text: "Остаток" }, { content: "multiSelectFilter" }],
            width: 140,
            css: { "text-align": "center" },
            tooltip: "",
            editor: "text",
          },
          {
            id: "reviews",
            sort: "int",
            header: [{ text: "Отзывы" }, { content: "numberFilter" }],
          },
          {
            id: "rating",
            sort: "int",
            header: [{ text: "Рейтинг" }, { content: "numberFilter" }],
          },
          {
            id: "price",
            sort: "int",
            header: [{ text: "Цена" }, { content: "numberFilter" }],
          },
        ],
        on: {
          onAfterColumnDropOrder() {
            saveConfiguration();
          },
          onAfterColumnHide() {
            saveConfiguration();
          },
          onAfterColumnShow() {
            saveConfiguration();
          },
          onColumnResize() {
            saveConfiguration();
          },
        },
        onClick: {
          favoriteButton: (e, id) => {
            const item = $$("table").getItem(id);
            item.isFavorite = !item.isFavorite;
            $$("table").updateItem(id, item);

            this.updateFavorite(item);
          },
        },
        scheme: {
          $init: (item) => {
            const favorites = this.getFavorites();

            item.isFavorite = !!favorites[item.id];
          },
        },
      },
    };
  },

  methods: {
    handleShowSettings() {
      this.isShowSettings = !this.isShowSettings;
    },
    getFavorites() {
      const favoriteRaw = localStorage.getItem("favorites");
      return favoriteRaw ? JSON.parse(favoriteRaw) : {};
    },
    setFavorites(favorites) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    updateFavorite(item) {
      const favorites = this.getFavorites();

      if (item.isFavorite) {
        favorites[item.id] = true;
      } else {
        delete favorites[item.id];
      }

      this.setFavorites(favorites);
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
}

.header {
  padding: 10px 0;

  &__title {
    margin: 0;
    margin-bottom: 10px;
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
    background: url('./assets/setting.svg') no-repeat left 10px center;
    background-size: 16px 16px;

    &:hover {
      cursor: pointer;
      border: 1px solid #aaaaaa;
    }
  }
}

.table {
  &__header {
    border-right: 1px solid #dadee0 !important;
  }

  &__img {
    width: 50px;
    height: 50px;
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
