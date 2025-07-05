import type { Usuario, UsuarioResponse, UsuarioResponseCreate } from "../../interfaces";
import { ApiService } from "../Utils/ApiServices";

export class UsuarioService {
    private api: ApiService

    constructor() {
        this.api = ApiService.getInstance(); 
    }

    async ListarUsuarios (q: string = ''): Promise<UsuarioResponse>{
        try {
            const response = this.api.get<UsuarioResponse>('users?q=' + q)
            return response
        } catch (error) {
            throw error
        }
    }

    async CrearUsuario (data: Usuario): Promise<UsuarioResponseCreate>{
        try {
            const response = this.api.post<UsuarioResponseCreate>('user', data)
            return response
        } catch (error) {
            throw error
        }
    }

    async EliminarUsuario(id: number){
        try {
            const response = this.api.delete('user/' + id)
            return response
        } catch (error) {
            throw error
        }
    }

    async EditarUsuario(data: any): Promise<UsuarioResponseCreate>{
        try {
            const response = this.api.put<UsuarioResponseCreate>('user/'+ data.id)
            return response
        } catch (error) {
            throw error
        }
    }
}