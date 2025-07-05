<?php

namespace App\Http\Requests\Usuario;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'n_identificacion' => ['required', 'string', 'unique:users,n_identificacion'],
            'nombre_usuario' => ['required', 'string'],
            'nombres' => ['required', 'string'],
            'apellidos' => ['required' , 'string'],
            'fecha_nacimiento' => ['required', 'date', 'before:today', 'after:1900-01-01'],
            'num_movil' => ['required' , 'string', 'max:15', 'min:10'],
            'num_fijo'=> ['required' , 'string', 'max:15', 'min:7'],
            'email'=> ['required' , 'string', 'max:255', 'unique:users,email'],
            'estado_civil' => ['required' , 'string'],
            'sexo' =>  ['required', 'string'],
            'direccion' => ['required', 'string', 'min:5', 'max:255'],
        ];
    }

    public function messages(): array
{
    return [

        'n_identificacion.required' => 'El número de identificación es obligatorio.',
        'n_identificacion.string' => 'El número de identificación debe ser texto.',
        'n_identificacion.unique' => 'Este número de identificación ya está registrado.',


        'nombre_usuario.required' => 'El nombre de usuario es obligatorio.',
        'nombre_usuario.string' => 'El nombre de usuario debe ser texto.',


        'nombres.required' => 'Los nombres son obligatorios.',
        'nombres.string' => 'Los nombres deben ser texto.',


        'apellidos.required' => 'Los apellidos son obligatorios.',
        'apellidos.string' => 'Los apellidos deben ser texto.',

        'fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria.',
        'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        'fecha_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
        'fecha_nacimiento.after' => 'La fecha de nacimiento debe ser posterior al año 1900.',

  
        'num_movil.required' => 'El número móvil es obligatorio.',
        'num_movil.string' => 'El número móvil debe ser texto.',
        'num_movil.max' => 'El número móvil no puede tener más de 15 caracteres.',
        'num_movil.min' => 'El número móvil debe tener al menos 10 caracteres.',


        'num_fijo.required' => 'El número fijo es obligatorio.',
        'num_fijo.string' => 'El número fijo debe ser texto.',
        'num_fijo.max' => 'El número fijo no puede tener más de 15 caracteres.',
        'num_fijo.min' => 'El número fijo debe tener al menos 7 caracteres.',


        'email.required' => 'El correo electrónico es obligatorio.',
        'email.string' => 'El correo electrónico debe ser texto.',
        'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
        'email.unique' => 'Este correo electrónico ya está registrado.',

 
        'estado_civil.required' => 'El estado civil es obligatorio.',
        'estado_civil.string' => 'El estado civil debe ser texto.',

      
        'sexo.required' => 'El sexo es obligatorio.',
        'sexo.string' => 'El sexo debe ser texto.',

        'direccion.required' => 'La dirección es obligatoria.',
        'direccion.string' => 'La dirección debe ser texto.',
        'direccion.min' => 'La dirección debe tener al menos 5 caracteres.',
        'direccion.max' => 'La dirección no puede tener más de 255 caracteres.'
    ];
}
}
