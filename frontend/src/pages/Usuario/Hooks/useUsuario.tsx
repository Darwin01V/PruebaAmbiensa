import React, { useCallback, useEffect, useState } from 'react'
import type { Usuario, UsuarioResponse } from '../../../interfaces'
import { UsuarioService } from '../../../Services/Modules/Usuario.service'

const useUsuario = () => {
    const UserApi = new UsuarioService()
    const [data, setData] = useState<UsuarioResponse>()
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getUsuarios = useCallback(async (q: string = '') => {
        setLoading(true)
        setError(null)
        try {
            const response = await UserApi.ListarUsuarios(q)
            console.log(response)
            setData(response)
            setUsuarios(response.data.data)
        } catch (err) {
            setError("Error al obtener los datos")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getUsuarios()
    }, [getUsuarios])

    return {
        data,
        usuarios,
        loading,
        error,
        UserApi,
        getUsuarios // Puedes llamar a esta función y pasarle el parámetro q para búsquedas
    }
}

export default useUsuario
