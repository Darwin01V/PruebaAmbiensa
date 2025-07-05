<?php

namespace App\Interfaces;

interface UsuarioServiceInterface
{
    public function register(array $data);
    public function listar(array $data);
    public function actualizar(int $id,array $data);
    public function eliminar(string $buscar);
}
