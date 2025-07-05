export interface ResponseApi {
    code: number;
    error: boolean;
    message: string;
}

export interface LinksPaginate {
    url: string;
    label: string;
    active: boolean;
}

export interface ResponsePaginate {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksPaginate[]; //
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Usuario {
    n_identificacion: string;
    nombre_usuario: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    num_movil: string;
    num_fijo: string;
    email: string;
    estado_civil: string;
    sexo: string;
    direccion: string;
    status: string;
}

export interface UsuarioPaginateResponse extends ResponsePaginate{
    data: Usuario[]
}

export interface UsuarioResponse extends ResponseApi{
    data: UsuarioPaginateResponse
}

export interface UsuarioResponseCreate extends ResponseApi{
    data: Usuario
}


export interface FormErrors {
    [key: string]: string | null;
}

export interface DropdownOption {
    label: string;
    value: string;
}