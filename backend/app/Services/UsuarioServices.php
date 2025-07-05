<?php

namespace App\Services;

use App\Interfaces\UsuarioServiceInterface;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class UsuarioServices implements UsuarioServiceInterface
{

    public function register(array $data)
    {
        if (!User::validarCedulaEcuatoriana($data['n_identificacion'])) {
            throw ValidationException::withMessages([
                'n_identificacion' => ['El número de cédula ecuatoriana no es válido.']
            ]);
        }

        $usuario = User::create([
            'n_identificacion' => $data['n_identificacion'],
            'nombre_usuario'  => $data['nombre_usuario'],
            'nombres' => $data['nombres'],
            'apellidos'  => $data['apellidos'],
            'fecha_nacimiento' => $data['fecha_nacimiento'],
            'num_movil' => $data['num_movil'],
            'num_fijo' => $data['num_fijo'],
            'email' => $data['email'],
            'estado_civil' => $data['estado_civil'],
            'sexo' => $data['sexo'],
            'direccion' => $data['direccion'],
        ]);

        return [
            'usuario' => $usuario,
            'meta' => [
                'action' => 'register',
                'status' => 'success'
            ],
        ];
    }

    public function listar($buscar = null)
    {
        $query = User::where('status', true);

        if (!empty($buscar)) {
            $query->where(function ($q) use ($buscar) {
                $q->where('nombres', 'like', "%{$buscar}%")
                    ->orWhere('apellidos', 'like', "%{$buscar}%")
                    ->orWhere('n_identificacion', 'like', "%{$buscar}%");
            });
        }

        $usuarios = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'usuarios' => $usuarios,
            'meta' => [
                'action' => 'list',
                'status' => 'success'
            ],
        ];
    }

    public function actualizar($id, $data)
    {
        // Buscar el usuario
        $usuario = User::find($id);

        if (!$usuario) {
            throw ValidationException::withMessages([
                'id' => ['El usuario no fue encontrado.']
            ]);
        }

        // Si se está actualizando la cédula, validarla
        if (isset($data['n_identificacion']) && $data['n_identificacion'] !== $usuario->n_identificacion) {
            if (!User::validarCedulaEcuatoriana($data['n_identificacion'])) {
                throw ValidationException::withMessages([
                    'n_identificacion' => ['El número de cédula ecuatoriana no es válido.']
                ]);
            }
        }

        // Actualizar solo los campos que vienen en $data
        $usuario->update($data);

        // Recargar el modelo para obtener los datos actualizados
        $usuario->refresh();

        return [
            'usuario' => $usuario,
            'meta' => [
                'action' => 'update',
                'status' => 'success'
            ],
        ];
    }
    public function eliminar($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            throw ValidationException::withMessages([
                'id' => ['El usuario no fue encontrado.']
            ]);
        }

        $usuario->update([
            "status" => false
        ]);

        return [
            'usuario' => $usuario,
            'meta' => [
                'action' => 'delete',
                'status' => 'success',
                'message' => 'Usuario desactivado correctamente'
            ],
        ];
    }
}
