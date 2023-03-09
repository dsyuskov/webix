
<template>
  <div id="app">
    <div class="header">
      <h2 class="header__title">Товары в категории</h2>
      <div class="header__filters">
        <div class="header__left">
          <header-search @onchange="applyFilter" />
          <header-favorites @onchange="applyFilter" />
        </div>
        <button class="header__button">Настройка таблицы</button>
      </div>
    </div>
    <data-table :config="table" :value="$options.products" class="table" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import DataTable from "./components/DataTable.vue";
import LikesIcon from "./components/LikesIcon.js";
import ImageTooltip from "./components/ImageTooltip";
import HeaderSearch from "./components/filters/Search.vue";
import HeaderFavorites from "./components/filters/Favorites.vue";

import products from "./data/data.json";

export default {
  name: "App",

  components: {
    DataTable,
    HeaderSearch,
    HeaderFavorites,
  },

  products,

  data() {
    return {
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
            header: ["Товар", { content: "textFilter" }],
          },
          {
            id: "brand",
            sort: "string",
            header: ["Бренд", { content: "textFilter" }],
          },
          {
            id: "merchant",
            sort: "string",
            header: ["Продавец", { content: "textFilter" }],
          },
          {
            id: "group",
            sort: "string",
            header: ["Группа", { content: "multiComboFilter" }],
            width: 150,
          },
          {
            id: "remains",
            sort: "int",
            // header: ["Остаток", { content: "numberFilter" }],
            header: ["Остаток", { content: "multiSelectFilter" }],
            width: 140,
            css: { "text-align": "center" },
            tooltip: "",
            editor: "text",
          },
          {
            id: "reviews",
            sort: "int",
            header: ["Отзывы", { content: "numberFilter" }],
          },
          {
            id: "rating",
            sort: "int",
            header: ["Рейтинг", { content: "numberFilter" }],
          },
          {
            id: "price",
            sort: "int",
            header: ["Цена", { content: "numberFilter" }],
          },
        ],
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
    padding: 5px;

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
