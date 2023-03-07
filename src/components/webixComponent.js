/* eslint-disable no-undef */
function dataHandler(value) {
  const view = $$(this.webixId);

  if (typeof value === 'object') {
    if (this.copyData) value = webix.copy(value);

    if (view.setValues) view.setValues(value);
    else if (view.parse) {
      view.clearAll();
      view.parse(value);
    }
  } else if (view.setValue) view.setValue(value);
}

export default {
  name: 'webix-ui',
  props: ['config', 'value', 'copyData'],
  watch: {
    value: {
      handler: dataHandler,
    },
  },

  template: '<div></div>',

  mounted() {
    const config = webix.copy(this.config);
    config.$scope = this;

    this.webixId = webix.ui(config, this.$el);
    if (this.value) dataHandler.call(this, this.value);

  },

  destroyed: function () {
    webix.$$(this.webixId).destructor();
  },
};
