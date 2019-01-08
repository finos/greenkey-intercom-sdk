import Vue from 'vue'
import App from './App.vue'
import GreenKeyComponent from './components/GreenKeyComponent'

Vue.component('GreenKeyComponent', GreenKeyComponent);

new Vue({
  render: h => h(App),
}).$mount('#app')
