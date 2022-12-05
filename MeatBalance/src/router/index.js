import { createRouter, createWebHistory } from 'vue-router'

import Pedidos from '../components/pedidosComponents/Pedidos.vue'
import Proveedores from '../components/proveedoresComponents/Proveedores.vue'
import Productos from '../components/productosComponents/Productos.vue'
import EditProductos from '../components/productosComponents/EditarProductos.vue'
import EditProveedor from '../components/proveedoresComponents/EditarProveedores.vue'

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
        },
        {
            path:'/EditarProducto',
            component:EditProductos
        },
        {
            path:'/EditarProveedor',
            component:EditProveedor
        }
    ]
})

export default router