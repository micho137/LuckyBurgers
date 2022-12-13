import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores/LoginStore'

import Login from '../components/LoginForm.vue'
import Pedidos from '../components/pedidosComponents/Pedidos.vue'
import Proveedores from '../components/proveedoresComponents/Proveedores.vue'
import Productos from '../components/productosComponents/Productos.vue'
import EditProductos from '../components/productosComponents/EditarProductos.vue'
import EditProveedor from '../components/proveedoresComponents/EditarProveedores.vue'
import Monetarios from '../components/monetariosComponents/Monetarios.vue'
import CompraInsumo from '../components/monetariosComponents/Insumo/compraInsumo.vue'
import GenerarEgreso from '../components/monetariosComponents/Egreso/generarEgreso.vue'
import Balance from '../components/monetariosComponents/Balance/Balance.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/Login',
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
            path:'/EditarProveedor',
            component:EditProveedor
        },
        {
            path:'/Productos',
            component:Productos
        },
        {
            path:'/EditarProducto',
            component:EditProductos
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
    const publicPage = ['/Login']
    const authRequire = !publicPage.includes(to.path)
    if (authRequire && !store.authUser) return '/Login'
}) 

export default router