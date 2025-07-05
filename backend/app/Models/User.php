<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'n_identificacion',
        'nombre_usuario',
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'num_movil',
        'num_fijo',
        'email',
        'estado_civil',
        'sexo',
        'direccion',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getNombreCompletoAttribute()
    {
        return $this->nombres . ' ' . $this->apellidos;
    }

    public static function validarCedulaEcuatoriana($cedula)
    {
        if (is_null($cedula) || !preg_match('/^\d{10}$/', $cedula)) {
            return false;
        }

        $digitos = str_split($cedula);
        $provincia = intval($cedula[0] . $cedula[1]);
        if ($provincia < 1 || $provincia > 24) {
            return false;
        }

        $suma = 0;
        for ($i = 0; $i < 9; $i++) {
            $valor = intval($digitos[$i]);
            if ($i % 2 == 0) {
                $valor *= 2;
                if ($valor > 9) $valor -= 9;
            }
            $suma += $valor;
        }
        $verificador = (10 - ($suma % 10)) % 10;
        return $verificador == intval($digitos[9]);
    }
}
