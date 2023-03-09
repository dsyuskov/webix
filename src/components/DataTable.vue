
<template>
  <div></div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: "webixDataTable",

  props: ["config", "value", "copyData"],

  methods: {
    dataHandler(value) {
      const view = $$(this.webixId);

      if (typeof value === "object") {
        if (this.copyData) value = webix.copy(value);

        if (view.setValues) view.setValues(value);
        else if (view.parse) {
          view.clearAll();
          view.parse(value);
        }
      } else if (view.setValue) view.setValue(value);
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
  },

  destroyed: function () {
    webix.$$(this.webixId).destructor();
  },
};
</script>