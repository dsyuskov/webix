<template>
  <div class="settings">
    <div class="settings__content">
      <button class="settings__close" @click="$emit('close')" />
      <ul class="list">
        <li class="list__item" v-for="column in columns" :key="column.id">
          <label class="list__label">
            <input
              type="checkbox"
              :value="column.id"
              :checked="isChecked(column)"
              @change="(event) => handleChangeCheckBox(event, column)"
            />
            {{ getColumnTitle(column) }}
          </label>
        </li>
      </ul>
      <button class="settings__default" @click="handleClickDefaultButton">
        Настройки по умолчанию
      </button>
    </div>
  </div>
</template>

<script>
import { defaultState } from "../constants";
/* eslint-disable no-undef */
export default {
  name: "TableSettings",

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      savedState: {},
    };
  },

  methods: {
    handleClickDefaultButton() {
      $$("table").setState(defaultState);
      webix.storage.local.put("tableSettings", defaultState);
    },
    handleChangeCheckBox(event, column) {
      const table = $$("table");

      if (event.target.checked) {
        table.showColumn(column.id);
      } else {
        table.hideColumn(column.id);
      }

      webix.storage.local.put("tableSettings", table.getState());
    },
    getColumnTitle(column) {
      if (Array.isArray(column.header)) {
        return column.header[0].text;
      }

      return column.header;
    },

    isChecked(column) {
      if (!this.savedState.hidden) {
        return true;
      }

      if (this.savedState.hidden.includes(column.id)) {
        return false;
      }

      return true;
    },
  },

  mounted() {
    this.savedState = webix.storage.local.get("tableSettings") || {};
  },
};
</script>

<style lang="scss">
.settings {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    z-index: 0;
    opacity: 0.6;
  }

  &__content {
    position: relative;
    width: 500px;
    background: #ffff;
    z-index: 1;
    padding: 20px;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 24px;
    height: 24px;
    background: url("../assets/close.svg") center center no-repeat;
    border: none;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }

  &__default {
    background: none;
    border: 1px solid #dddddd;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;

    &:hover {
      cursor: pointer;
      border: 1px solid #aaaaaa;
    }
  }
}

.list {
  margin: 0;
  padding: 0;
  display: block;
  list-style: none;

  &__item {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__label {
    cursor: pointer;
  }
}
</style>