/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import VueCurrencyFilter from 'vue-currency-filter'
import money from 'v-money'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(money, {precision: 2})

Vue.use(ArgonDashboard)
Vue.use(VueCurrencyFilter,{
  symbol:'$', //Simbolo de la moneda
  thousandsSeparator: ',', // Separador de miles
  fractionCount: 2, // ¿Cuántos decimales mostrar?
  fractionSeparator: '.', // Separador de decimales
  symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
  symbolSpacing: true
});

Number.prototype.formatMoney = function (c, d, t) {
  var n = this
  c = isNaN(c = Math.abs(c)) ? 2 : c
  d = d == undefined ? '.' : d
  t = t == undefined ? ',' : t
  let s = n < 0 ? '-' : ''
  let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
  let j = (i.length) > 3 ? i.length % 3 : 0
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
}

Vue.filter('formatMoney', function (v) {
  return parseFloat(v).formatMoney('2', '.', ',')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formatDate', function(value) {
  if (value) {
    moment.locale('es-mx')
    return moment(String(value)).format('LLL');
  }
})
