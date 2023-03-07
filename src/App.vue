<template>
  <div id="app">
    <app-header />
    <webix-ui :config="table" v-model="$options.products" />
  </div>
</template>

<script>
import WebixUi from "./components/webixComponent";
import AppHeader from './components/Header/AppHeader.vue';
import ImageTooltip from './components/ImageTooltip';

import products from './data/data.json'

export default {
  name: "App",

  products,

  components: {
    AppHeader,
    WebixUi,
  },

  data() {
    return {
      table: {
        view: "datatable",
        autoheight: true,
        autowidth: true,
        tooltip: { template: "" },
        columns: [
          {
            id: "loosesPercent",
            sort: "string",
            header: "Упущен",
            hidden:false
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
            template: (item) => ImageTooltip(item.picture),
            tooltip: function (item) {
              return `<span>${item.picture}</span>`;
            },
          },
          {
            id: "sku",
            sort: "string",
            header: "Артикул",
          },
          {
            id: "chartSales",
            sort: "string",
            header: "График продаж",
            // eslint-disable-next-line no-undef
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

          // {
          //   id: "value",
          //   editor: "select",
          //   sort: "string",
          //   header: "Section Index",
          // },
          // {
          //   id: "name",
          //   editor: "text",
          //   sort: "string",
          //   header: ["First Name", { content: "textFilter" }],
          // },
        ],
        on: {
          onAfterEditStop: function () {
            this.$scope.$emit("input", this.serialize());
          },
        },
      },
    };
  },
};
</script>

<style>
#app {
  max-width: 1980px;
}
</style>
