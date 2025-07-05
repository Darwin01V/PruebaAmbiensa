<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::post('/user', [UsuarioController::class, 'crear_usuario']);
    Route::put('/user/{id}', [UsuarioController::class, 'actualizar_usuario']);
    Route::delete('/user/{id}', [UsuarioController::class, 'eliminar_usuario']);
    Route::get('/users', [UsuarioController::class, 'listar_usuarios']);
});