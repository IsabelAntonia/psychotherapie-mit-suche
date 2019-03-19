import Vue from 'vue'
import Router from 'vue-router'
import Startseite from './views/Startseite.vue'
import Therapieangebot from './views/Therapieangebot.vue'
import Impressum from './views/Impressum.vue'
import Datenschutz from './views/Datenschutz.vue'
import Therapeutensuche from './views/Therapeutensuche.vue'
import Ergebnis from './views/Ergebnis.vue'
import Kontakt from './views/Kontakt.vue'

Vue.use(Router)

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: Startseite
    },

    {
      path: '/startseite',
      name: 'startseite',
      component: Startseite
    },

    {
      path: '/therapieangebot',
      name: 'therapieangebot',
      component: Therapieangebot
    },

    {
      path: '/datenschutz',
      name: 'datenschutz',
      component: Datenschutz
    },

    {
      path: '/impressum',
      name: 'impressum',
      component: Impressum
    },
    {
      path: '/therapeutensuche',
      name: 'therapeutensuche',
      component: Therapeutensuche
    },
    {
      path: '/ergebnis',
      name: 'ergebnis',
      component: Ergebnis
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: Kontakt
    }
  ]
})

export default router