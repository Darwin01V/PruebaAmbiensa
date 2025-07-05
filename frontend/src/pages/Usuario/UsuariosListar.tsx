import { DataTable } from 'primereact/datatable'
import useUsuario from './Hooks/useUsuario'
import { Column } from 'primereact/column'
import { Link, useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import ActionBodyTemplate from '../../Components/ActionBodyTemplate/ActionBodyTemplate'

export const UsuariosListar = () => {
    const { usuarios, getUsuarios, loading, UserApi } = useUsuario()
    const [busqueda, setBusqueda] = useState('')
    const navigate = useNavigate()

    const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setBusqueda(value)
        getUsuarios(value)
    }

    const handleEdit = (rowData: any) => {
         localStorage.setItem('usuarioEditar', JSON.stringify(rowData)) // Guarda el usuario en localStorage
        navigate(`editar`)

    }

    const handleDelete = async (id: any) => {
        try {
            await UserApi.EliminarUsuario(id)
            getUsuarios()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-10 space-y-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='m-0 text-2xl font-bold'>Lista de Usuarios</p>
                </div>

                <div>
                    <Link to={'/nuevo'} className='bg-green-600 px-3.5 py-2 rounded-lg text-white font-bold hover:bg-green-700'>Nuevo Usuario</Link>
                </div>
            </div>

            <div className="flex justify-end">
                <span className="p-input-icon-left w-[33%]">
                    <InputText
                        value={busqueda}
                        onChange={handleBuscar}
                        placeholder="Buscar por nombre, apellido o identificación"
                        className='w-full'
                    />
                </span>
            </div>

            {/* Table */}
            <div>
                <DataTable value={usuarios} loading={loading} emptyMessage={"No hay resultados "}>
                    <Column field="n_identificacion" header="Numero Ceduka"></Column>
                    <Column field="nombre_usuario" header="UserName"></Column>
                    <Column field="nombres" header="Nombre"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                    <Column field="fecha_nacimiento" header="Fecha Nacimiento"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column
                        body={(rowData: any) => (
                            <ActionBodyTemplate
                                rowData={rowData}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                iconDelete={rowData.status ? 'pi-times' : "pi-check"}
                            />
                        )}
                        header="Acciones"
                    />
                </DataTable>
            </div>
        </div>
    )
}
