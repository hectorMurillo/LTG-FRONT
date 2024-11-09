import clickOutside from "../directives/click-ouside.js";
import upperCase from "../directives/upper-case.js";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", clickOutside);
    Vue.directive("upper-case", upperCase);
  }
};

export default GlobalDirectives;
