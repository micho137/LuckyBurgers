import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/LoginStore'

import Login from '../components/LoginForm.vue'
import Pedidos from '../components/pedidosComponents/Pedidos.vue'
import Proveedores from '../components/proveedoresComponents/Proveedores.vue'
import Productos from '../components/productosComponents/Productos.vue'
import Monetarios from '../components/monetariosComponents/Monetarios.vue'
import CompraInsumo from '../components/monetariosComponents/Insumo/compraInsumo.vue'
import GenerarEgreso from '../components/monetariosComponents/Egreso/generarEgreso.vue'
import Balance from '../components/monetariosComponents/Balance/Balance.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path:'/Pedidos',
            component:Pedidos
        },
        {
            path:'/Proveedores',
            component:Proveedores
        },
        {
            path:'/Productos',
            component:Productos
        },
        {
            path:'/Monetarios',
            component:Monetarios
        },
        {
            path:'/CompraInsumo',
            component:CompraInsumo
        },
        {
            path:'/GenerarEgreso',
            component:GenerarEgreso
        },
        {
            path:'/Balance',
            component:Balance
        },
        
    ]
})

router.beforeEach((to)=>{
    const store = useLoginStore()
    const publicPage = ['/']
    const authRequire = !publicPage.includes(to.path)
    if (authRequire && !store.authUser) return '/'
}) 

export default router