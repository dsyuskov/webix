
<template>
  <div>
    <div id="webixTable"></div>
    <div id="webixPagination"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Position from "./Position";
import LikesIcon from "./LikesIcon";
import ImageTooltip from "./ImageTooltip";

import {
  DEFAULT_TABLE_SETTINGS,
  STORAGE_TABLE_SETTINGS,
} from "../../constants";

export default {
  name: "webixDataTable",

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      config: {
        id: "table",
        view: "datatable",
        container: "webixTable",
        autowidth: false,
        autoheight: true,
        dragColumn: "order",
        resizeColumn: true,
        pager: {
          container: "webixPagination",
          size: 20,
          group: 5,
        },
        tooltip: { template: "" },
        columns: [
          {
            id: "loosesPercent",
            sort: "int",
            header: [
              { text: "Упущен %", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            css: { "text-align": "center" },
            width: 100,
          },
          {
            id: "position",
            sort: "int",
            header: [
              { text: "Позиция", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
            template: (item) => Position(item),
          },
          {
            id: "picture",
            header: [
              { text: "Фото", css: "table__header" },
              { text: "", css: "table__header" },
            ],
            css: { "text-align": "center" },
            width: 80,
            template: (item) =>
              `<img class="table__img" src="./assets/images/thumbs/${item.picture}">`,
            tooltip: (item) => ImageTooltip(item.picture),
          },
          {
            id: "sku",
            sort: "string",
            header: [
              { text: "Артикул", css: "table__header" },
              { content: "textFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
          },
          {
            id: "isFavorite",
            sort: "string",
            header: [
              { text: "Избранное", css: "table__header table__header_hide" },
              { text: "", css: "table__header" },
            ],
            css: { "text-align": "center" },
            maxWidth: 60,
            width: 60,
            template: (item) => LikesIcon(item.isFavorite),
          },
          {
            id: "chartSales",
            sort: "string",
            header: [
              { text: "График продаж", css: "table__header" },
              { text: "", css: "table__header" },
            ],
            css: { "text-align": "center" },
            template: webix.Sparklines.getTemplate({
              type: "bar",
            }),
            width: 200,
            maxWidth: 250,
            minWidth: 200,
          },
          {
            id: "product",
            sort: "string",
            header: [
              { text: "Товар", css: "table__header" },
              { content: "textFilter", css: "table__header" },
            ],
            fillspace: true,
          },
          {
            id: "brand",
            sort: "string",
            header: [
              { text: "Бренд", css: "table__header" },
              { content: "textFilter", css: "table__header" },
            ],
            width: 100,
          },
          {
            id: "merchant",
            sort: "string",
            header: [
              { text: "Продавец", css: "table__header" },
              { content: "textFilter", css: "table__header" },
            ],
            width: 100,
          },
          {
            id: "group",
            sort: "string",
            header: [
              { text: "Группа", css: "table__header" },
              { content: "multiComboFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
          },
          {
            id: "remains",
            sort: "int",
            header: [
              { text: "Остаток", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            css: { "text-align": "center" },
            width: 100,
            tooltip: "",
            editor: "text",
          },
          {
            id: "reviews",
            sort: "int",
            header: [
              { text: "Отзывы", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
          },
          {
            id: "rating",
            sort: "int",
            header: [
              { text: "Рейтинг", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
          },
          {
            id: "price",
            sort: "int",
            header: [
              { text: "Цена", css: "table__header" },
              { content: "numberFilter", css: "table__header" },
            ],
            width: 100,
            css: { "text-align": "center" },
          },
        ],
        on: {
          onAfterColumnDropOrder() {
            this.$scope.saveConfiguration();
          },
          onAfterColumnHide() {
            this.$scope.saveConfiguration();
          },
          onAfterColumnShow() {
            this.$scope.saveConfiguration();
          },
          onColumnResize() {
            this.$scope.saveConfiguration();
          },
        },
        onClick: {
          favoriteButton: (e, id) => {
            const item = this.webixId.getItem(id);

            item.isFavorite = !item.isFavorite;
            this.webixId.updateItem(id, item);

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
    dataHandler(value) {
      const view = $$(this.webixId);

      if (typeof value === "object") {
        if (view.setValues) {
          view.setValues(value);
        } else if (view.parse) {
          view.clearAll();
          view.parse(value);
        }
      } else if (view.setValue) {
        view.setValue(value);
      }
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
    saveConfiguration() {
      if (this.webixId) {
        webix.storage.local.put(STORAGE_TABLE_SETTINGS, this.webixId.getState());
      }
    },
  },

  mounted() {
    const config = webix.copy(this.config);
    config.$scope = this;

    this.webixId = webix.ui(config, this.$el);

    if (this.value) {
      this.dataHandler.call(this, this.value);
    }

    this.webixId.registerFilter(
      document.getElementById("searchString"),
      {
        columnId: "any",
        compare: (cellValue, filterValue, item) => {
          return (
            item.sku.includes(filterValue) ||
            item.product.includes(filterValue) ||
            item.brand.includes(filterValue) ||
            item.merchant.includes(filterValue)
          );
        },
      },
      {
        getValue: function (element) {
          return element.value;
        },
        setValue: function (element, value) {
          element.value = value;
        },
      }
    );

    this.webixId.registerFilter(
      document.getElementById("favorites"),
      {
        columnId: "isFavorite",
        prepare: (filterValue) => {
          return filterValue;
        },
        compare: (cellValue, filterValue, item) => {
          if (filterValue) {
            return item.isFavorite === true;
          }

          return true;
        },
      },
      {
        getValue: function (element) {
          return element.checked;
        },
        setValue: function (element, value) {
          element.checked = value;
        },
      }
    );

    const savedState =
      webix.storage.local.get(STORAGE_TABLE_SETTINGS) || DEFAULT_TABLE_SETTINGS;

    if (savedState) {
      this.webixId.setState(savedState);
    }
  },

  destroyed: function () {
    webix.$$(this.webixId).destructor();
  },
};
</script>

<style lang="scss">
.table {
  &__header {
    border-right: 1px solid #dadee0 !important;

    &_hide {
      color: transparent;
    }
  }

  &__img {
    border-radius: 5px;
    height: 30px;
    width: 30px;
  }
}

.position {
  &__item {
    border-radius: 5px;
    margin-left: 5px;
    padding: 5px;

    &_positive {
      color: #25ac25;
      background: rgba($color: #00ff00, $alpha: 0.2);
    }

    &_negative {
      color: #ac2525;
      background: rgba($color: #ff0000, $alpha: 0.2);
    }
  }
}
</style>