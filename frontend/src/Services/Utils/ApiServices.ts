import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosRequestConfig, type AxiosInstance } from "axios";
import config from "./Config";

export class ApiService {
    private static instance: ApiService;
    private api: AxiosInstance;
    private token: string | null = null;

    private constructor() {
        this.api = axios.create({
            baseURL: config.baseurl,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        // Interceptor para agregar token a cada solicitud
        this.api.interceptors.request.use(
            (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                if (this.token && request.headers) {
                    request.headers.Authorization = `Bearer ${this.token}`;
                }
                return request;
            },
            (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
        );
        
        // Interceptor de respuesta para manejar errores
        this.api.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse => response,
            (error: AxiosError): Promise<never> => {
                return this.handleError(error);
            }
        );
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private handleError(error: AxiosError): Promise<never> {
        if (!error.response) {
            console.error("🚨 Error de red:", error.message);
            return Promise.reject("Error de conexión. Verifica tu red.");
        }
    
        const { status, data } = error.response;
    
        switch (status) {
            case 401:
                console.warn("🔑 Token inválido o expirado.");
                break;
            case 403:
                console.error("🚫 Acceso denegado:", data);
                break;
            case 404:
                console.error("❌ Recurso no encontrado:", data);
                break;
            case 500:
                console.error("🔥 Error en el servidor:", data);
                break;
            default:
                console.error(`⚠️ Error ${status}:`, data);
        }
    
        return Promise.reject(data);
    }

    public async postMultipart<T>(url: string, data: FormData, config?: AxiosRequestConfig): Promise<T> {
        const headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data',
            ...config?.headers,
        };
        
        try {
            const response = await this.api.post<T>(url, data, { headers });
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }    

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.api.get<T>(url, config).then(this.handleResponse<T>);
    }
    
    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.api.post<T>(url, data, config).then(this.handleResponse<T>);
    }
    
    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.api.put<T>(url, data, config).then(this.handleResponse<T>);
    }
    
    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.api.delete<T>(url, config).then(this.handleResponse<T>);
    }

    private handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }
}

export default ApiService.getInstance();