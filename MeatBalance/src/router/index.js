import { createRouter, createWebHistory } from 'vue-router'

import Pedidos from '../components/Pedidos.vue'
import Proveedores from '../components/Proveedores.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component:Pedidos
        },
        {
            path:'/Proveedores',
            component:Proveedores
        }
    ]
})

export default router