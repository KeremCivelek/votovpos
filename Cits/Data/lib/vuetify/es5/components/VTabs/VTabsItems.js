"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VWindow = _interopRequireDefault(require("../VWindow/VWindow"));

var _VItemGroup = require("./../VItemGroup/VItemGroup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
var _default = _VWindow.default.extend({
  name: 'v-tabs-items',
  props: {
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes() {
      return _objectSpread(_objectSpread({}, _VWindow.default.options.computed.classes.call(this)), {}, {
        'v-tabs-items': true
      });
    },
    isDark: function isDark() {
      return this.rootIsDark;
    }
  },
  methods: {
    getValue: function getValue(item, i) {
      return item.id || _VItemGroup.BaseItemGroup.options.methods.getValue.call(this, item, i);
    }
  }
});

exports.default = _default;
//# sourceMappingURL=VTabsItems.js.map