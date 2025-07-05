import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import { UsuariosListar } from "../pages/Usuario/UsuariosListar";
import NuevoUsario from "../pages/Usuario/NuevoUsario";
import EditarUsuario from "../pages/Usuario/EditarUsuario";


export const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <UsuariosListar />
            },
            {
                path: "nuevo",
                element: <NuevoUsario />
            },
            {
                path: "editar",
                element: <EditarUsuario />
            }
        ]
    }
])