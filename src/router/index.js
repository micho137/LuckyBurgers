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
import EditarPedido from '../components/pedidosComponents/EditarPedido.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Login',
            component:Login
        },
        {
            path:'/Pedidos',
            name:'Pedidos',
            component:Pedidos
        },
        {
            path:'/EditarPedido/:id',
            name:'EditarPedido',
            component:EditarPedido,
            props:true
        },
        {
            path:'/Proveedores',
            name:'Proveedores',
            component:Proveedores
        },
        {
            path:'/Productos',
            name:'Productos',
            component:Productos
        },
        {
            path:'/Monetarios',
            name:'Monetarios',
            component:Monetarios
        },
        {
            path:'/CompraInsumo',
            name:'CompraInsumo',
            component:CompraInsumo
        },
        {
            path:'/GenerarEgreso',
            name:'GenerarEgreso',
            component:GenerarEgreso
        },
        {
            path:'/Balance',
            name:'Balance',
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