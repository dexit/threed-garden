import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

// Ethereum: Vue Dapp
//import { VueDapp } from 'vue-dapp'

const app = createApp(App)

//app.use(VueDapp) //, 
// {
// //   infuraId: '...', // optional: for enabling WalletConnect and/or WalletLink
// //   appName: '...', // optional: for enabling WalletLink
// //   appUrl: '...', // optional: for enabling MetaMask deep link for mobile devices
// })

// setup up pages with layouts
const routes = setupLayouts(generatedRoutes)
const router = createRouter({ history: createWebHashHistory(), routes })
app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes }))

// add window
//app.config.globalProperties.window = window

app.mount('#app')

console.log("vue app (mounted)", app)