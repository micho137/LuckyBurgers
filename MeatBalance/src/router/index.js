import { createRouter, createWebHistory } from 'vue-router'

import Pedidos from '../components/pedidosComponents/Pedidos.vue'
import Proveedores from '../components/proveedoresComponents/Proveedores.vue'
import Productos from '../components/productosComponents/Productos.vue'

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
        },
        {
            path:'/Productos',
            component:Productos
        }
    ]
})

export default router