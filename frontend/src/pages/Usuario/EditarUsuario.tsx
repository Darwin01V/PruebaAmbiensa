import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useState, useRef, useEffect } from 'react';
import { UsuarioService } from '../../Services/Modules/Usuario.service';
import type { DropdownOption, FormErrors, UsuarioResponseCreate } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

export interface Usuario {
    id?: number
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


const EditarUsuario: React.FC = () => {
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const ApiUsuario = new UsuarioService()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<Usuario>({
        n_identificacion: '',
        nombre_usuario: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        num_movil: '',
        num_fijo: '',
        email: '',
        estado_civil: '',
        sexo: '',
        direccion: '',
        status: 'activo'
    });

    const estadosCiviles: DropdownOption[] = [
        { label: 'Soltero/a', value: 'soltero' },
        { label: 'Casado/a', value: 'casado' },
        { label: 'Divorciado/a', value: 'divorciado' },
        { label: 'Viudo/a', value: 'viudo' },
        { label: 'Unión Libre', value: 'union_libre' }
    ];

    const sexos: DropdownOption[] = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Femenino', value: 'femenino' },
        { label: 'Otro', value: 'otro' }
    ];

    useEffect(() => {
        const itemStr = localStorage.getItem('usuarioEditar'); // Obtiene el usuario de localStorage
        if (itemStr) {
            try {
                const item: Usuario = JSON.parse(itemStr);
                setFormData(item);
            } catch (e) {
                // Si hay error al parsear, no actualiza el formData
                console.error('Error parsing usuarioEditar from localStorage', e);
            }
        }
    }, [])

    // Manejar cambios en inputs de texto
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Usuario): void => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    // Manejar cambios en dropdowns
    const handleSelectChange = (e: { value: string }, field: keyof Usuario): void => {
        const value = e.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    // Validaciones del formulario
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validar campos requeridos
        if (!formData.n_identificacion.trim()) {
            newErrors.n_identificacion = 'La identificación es obligatoria';
        } else if (formData.n_identificacion.length < 10) {
            newErrors.n_identificacion = 'La identificación debe tener al menos 10 caracteres';
        }

        if (!formData.nombre_usuario.trim()) {
            newErrors.nombre_usuario = 'El nombre de usuario es obligatorio';
        } else if (formData.nombre_usuario.length < 3) {
            newErrors.nombre_usuario = 'El nombre de usuario debe tener al menos 3 caracteres';
        }

        if (!formData.nombres.trim()) {
            newErrors.nombres = 'Los nombres son obligatorios';
        }

        if (!formData.apellidos.trim()) {
            newErrors.apellidos = 'Los apellidos son obligatorios';
        }

        if (!formData.fecha_nacimiento) {
            newErrors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
        } else {
            const fechaNacimiento = new Date(formData.fecha_nacimiento);
            const hoy = new Date();
            if (fechaNacimiento >= hoy) {
                newErrors.fecha_nacimiento = 'La fecha de nacimiento debe ser anterior a hoy';
            }
        }

        if (!formData.num_movil.trim()) {
            newErrors.num_movil = 'El número móvil es obligatorio';
        } else if (formData.num_movil.length < 10) {
            newErrors.num_movil = 'El número móvil debe tener al menos 10 caracteres';
        }

        if (!formData.num_fijo.trim()) {
            newErrors.num_fijo = 'El número fijo es obligatorio';
        } else if (formData.num_fijo.length < 7) {
            newErrors.num_fijo = 'El número fijo debe tener al menos 7 caracteres';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'El formato del email no es válido';
            }
        }

        if (!formData.estado_civil) {
            newErrors.estado_civil = 'El estado civil es obligatorio';
        }

        if (!formData.sexo) {
            newErrors.sexo = 'El sexo es obligatorio';
        }

        if (!formData.direccion.trim()) {
            newErrors.direccion = 'La dirección es obligatoria';
        } else if (formData.direccion.length < 5) {
            newErrors.direccion = 'La dirección debe tener al menos 5 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Enviar formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validación',
                detail: 'Por favor corrige los errores en el formulario',
                life: 3000
            });
            return;
        }

        setLoading(true);

        try {
            const response = await ApiUsuario.EditarUsuario(formData)

            const data: UsuarioResponseCreate = response;
            localStorage.removeItem('usuarioEditar')

            if (!data.error) {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Usuario creado exitosamente',
                    life: 3000
                });

                navigate('/')
            }
        } catch (error: any) {
            const { message, code } = error;

            if (code === 422) {
                // Si message es un objeto con errores por campo
                if (typeof message === 'object' && message !== null) {
                    const backendErrors: FormErrors = {};

                    Object.keys(message).forEach(field => {
                        // Si el campo tiene errores (array de strings)
                        if (Array.isArray(message[field]) && message[field].length > 0) {
                            backendErrors[field] = message[field][0]; // Tomar el primer error
                        }
                    });

                    setErrors(backendErrors);

                } else {
                    // Si message es un string simple
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error de validación',
                        detail: message || 'Error en los datos enviados',
                        life: 3000
                    });
                }
            } else {
                // Otros códigos de error
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: message || 'Error de conexión',
                    life: 3000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Limpiar formulario
    const handleReset = (): void => {
        setErrors({});
        localStorage.removeItem('usuarioEditar')
        navigate("/")
    };

    return (
        <div className='p-4'>
            <Toast ref={toast} />

            <div className='font-bold'>
                <p className='text-xl'>Editar Usuario</p>
            </div>

            <div className='pt-4'>
                <div>
                    <form onSubmit={handleSubmit} className='space-y-10'>
                        {/* Primera fila */}
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="nombres">Nombres *</label>
                                <InputText
                                    id="nombres"
                                    value={formData.nombres}
                                    onChange={(e) => handleInputChange(e, 'nombres')}
                                    className={errors.nombres ? 'p-invalid' : ''}
                                    placeholder="Ingrese los nombres"
                                    maxLength={100}
                                />
                                {errors.nombres && (
                                    <small className="p-error">{errors.nombres}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="apellidos">Apellidos *</label>
                                <InputText
                                    id="apellidos"
                                    value={formData.apellidos}
                                    onChange={(e) => handleInputChange(e, 'apellidos')}
                                    className={errors.apellidos ? 'p-invalid' : ''}
                                    placeholder="Ingrese los apellidos"
                                    maxLength={100}
                                />
                                {errors.apellidos && (
                                    <small className="p-error">{errors.apellidos}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="identificacion">Identificación *</label>
                                <InputText
                                    id="identificacion"
                                    value={formData.n_identificacion}
                                    onChange={(e) => handleInputChange(e, 'n_identificacion')}
                                    className={errors.n_identificacion ? 'p-invalid' : ''}
                                    placeholder="Ingrese la identificación"
                                    maxLength={20}
                                />
                                {errors.n_identificacion && (
                                    <small className="p-error">{errors.n_identificacion}</small>
                                )}
                            </div>
                        </div>

                        {/* Segunda fila */}
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="nombre_usuario">Nombre Usuario *</label>
                                <InputText
                                    id="nombre_usuario"
                                    value={formData.nombre_usuario}
                                    onChange={(e) => handleInputChange(e, 'nombre_usuario')}
                                    className={errors.nombre_usuario ? 'p-invalid' : ''}
                                    placeholder="Ingrese el nombre de usuario"
                                    maxLength={50}
                                />
                                {errors.nombre_usuario && (
                                    <small className="p-error">{errors.nombre_usuario}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="fecha_nacimiento">Fecha nacimiento *</label>
                                <InputText
                                    id="fecha_nacimiento"
                                    type='date'
                                    value={formData.fecha_nacimiento}
                                    onChange={(e) => handleInputChange(e, 'fecha_nacimiento')}
                                    className={errors.fecha_nacimiento ? 'p-invalid' : ''}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                {errors.fecha_nacimiento && (
                                    <small className="p-error">{errors.fecha_nacimiento}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="num_movil">Numero Celular *</label>
                                <InputText
                                    id="num_movil"
                                    value={formData.num_movil}
                                    onChange={(e) => handleInputChange(e, 'num_movil')}
                                    className={errors.num_movil ? 'p-invalid' : ''}
                                    placeholder="Ingrese el número móvil"
                                    maxLength={15}
                                />
                                {errors.num_movil && (
                                    <small className="p-error">{errors.num_movil}</small>
                                )}
                            </div>
                        </div>

                        {/* Tercera fila */}
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="num_fijo">Teléfono *</label>
                                <InputText
                                    id="num_fijo"
                                    value={formData.num_fijo}
                                    onChange={(e) => handleInputChange(e, 'num_fijo')}
                                    className={errors.num_fijo ? 'p-invalid' : ''}
                                    placeholder="Ingrese el teléfono fijo"
                                    maxLength={15}
                                />
                                {errors.num_fijo && (
                                    <small className="p-error">{errors.num_fijo}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="email">Email *</label>
                                <InputText
                                    id="email"
                                    type='email'
                                    value={formData.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className={errors.email ? 'p-invalid' : ''}
                                    placeholder="Ingrese el email"
                                    maxLength={255}
                                />
                                {errors.email && (
                                    <small className="p-error">{errors.email}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="direccion">Dirección *</label>
                                <InputText
                                    id="direccion"
                                    value={formData.direccion}
                                    onChange={(e) => handleInputChange(e, 'direccion')}
                                    className={errors.direccion ? 'p-invalid' : ''}
                                    placeholder="Ingrese la dirección"
                                    maxLength={255}
                                />
                                {errors.direccion && (
                                    <small className="p-error">{errors.direccion}</small>
                                )}
                            </div>
                        </div>

                        {/* Cuarta fila */}
                        <div className='flex justify-between gap-4'>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="estado_civil">Estado Civil *</label>
                                <Dropdown
                                    id="estado_civil"
                                    value={formData.estado_civil}
                                    options={estadosCiviles}
                                    onChange={(e) => handleSelectChange(e, 'estado_civil')}
                                    placeholder="Seleccione estado civil"
                                    className={errors.estado_civil ? 'p-invalid' : ''}
                                />
                                {errors.estado_civil && (
                                    <small className="p-error">{errors.estado_civil}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="sexo">Sexo *</label>
                                <Dropdown
                                    id="sexo"
                                    value={formData.sexo}
                                    options={sexos}
                                    onChange={(e) => handleSelectChange(e, 'sexo')}
                                    placeholder="Seleccione sexo"
                                    className={errors.sexo ? 'p-invalid' : ''}
                                />
                                {errors.sexo && (
                                    <small className="p-error">{errors.sexo}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                {/* Espacio vacío para mantener la alineación */}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className='flex justify-end gap-4'>
                            <Button
                                label="Cancelar"
                                icon="pi pi-trash"
                                type="button"
                                className="p-button-outlined p-button-secondary"
                                onClick={handleReset}
                                disabled={loading}
                            />
                            <Button
                                label={loading ? 'Actualizando...' : 'Actualizar Usuario'}
                                icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                                type="submit"
                                disabled={loading}
                                className="p-button-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;