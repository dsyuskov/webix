
<template>
  <div id="app">
    <app-header />
    <webix-ui :config="table" :value="mappingProducts" class="table" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import WebixUi from "./components/webixComponent";
import LikesIcon from "./components/LikesIcon.js";
import AppHeader from "./components/Header/AppHeader.vue";
import ImageTooltip from "./components/ImageTooltip";

import products from "./data/data.json";

export default {
  name: "App",

  components: {
    WebixUi,
    AppHeader,
  },

  data() {
    return {
      isShowFavorites: true,

      products,
      table: {
        view: "datatable",
        id: "table",
        css: "webix_header_border",
        autoheight: true,
        autowidth: true,
        dragColumn: "order",
        pager: {
          size: 10,
          group: 5,
        },
        tooltip: { template: "" },
        columns: [
          {
            id: "loosesPercent",
            sort: "string",
            header: "Упущен",
            hidden: false,
          },
          {
            id: "position",
            sort: "string",
            header: "Позиция",
          },
          {
            id: "picture",
            sort: "string",
            header: "Фото",
            template: (item) =>
              `<img class="table__img" src="./assets/images/thumbs/${item.picture}">`,
            tooltip: (item) => ImageTooltip(item.picture),
          },
          {
            id: "sku",
            sort: "string",
            header: [{ text: "Артикул", colspan: 2 }],
          },
          {
            id: "isFavorite",
            sort: "string",
            template: (item) => LikesIcon(item.isFavorite),
          },
          {
            id: "chartSales",
            sort: "string",
            header: "График продаж",
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
            header: "Товар",
          },
          {
            id: "brand",
            sort: "string",
            header: "Бренд",
          },
          {
            id: "merchant",
            sort: "string",
            header: "Продавец",
          },
          {
            id: "group",
            sort: "string",
            header: "Группа",
          },
          {
            id: "remains",
            sort: "int",
            header: "Остаток",
          },
          {
            id: "reviews",
            sort: "int",
            header: "Отзывы",
          },
          {
            id: "rating",
            sort: "int",
            header: "Рейтинг",
          },
          {
            id: "price",
            sort: "int",
            header: "Цена",
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
  },

  computed: {
    mappingProducts() {
      const favorites = this.getFavorites();

      return this.products.map((product) => {
        product.isFavorite = !!favorites[product.id];

        return product;
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1980px;
}

.table {
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
