<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Usuario\UsuarioCreateRequest;
use App\Http\Requests\Usuario\UsuarioUpdateRequest;
use App\Interfaces\UsuarioServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class UsuarioController extends Controller
{
    protected $UsuarioService;

    public function __construct(UsuarioServiceInterface $UsuarioService)
    {
        $this->UsuarioService = $UsuarioService;
    }

    public function crear_usuario(UsuarioCreateRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $response = $this->UsuarioService->register($data);

            return ApiResponse::success($response, "Usuario registrado correctamente", 201);
        } catch (ValidationException $error) {
            return ApiResponse::error(
                'Error de validación en los datos enviados.',
                422,
                $error->errors()
            );
        } catch (\Throwable $th) {
            Log::error('Ha ocurrido un error - crear_usuario: ' . $th->getMessage(), ['exception' => $th]);
            return ApiResponse::error('Ha ocurrido un error al procesar su solicitud.', 500);
        }
    }

    public function actualizar_usuario(UsuarioUpdateRequest $request, $id): JsonResponse
    {
        try {
            $data = $request->validated();
            $response = $this->UsuarioService->actualizar($id, $data);

            return ApiResponse::success($response, "Usuario actualizado correctamente", 200);
        } catch (ValidationException $error) {
            return ApiResponse::error(
                'Error de validación en los datos enviados.',
                422,
                $error->errors()
            );
        } catch (\Throwable $th) {
            Log::error('Ha ocurrido un error - actualizar_usuario: ' . $th->getMessage(), ['exception' => $th]);
            return ApiResponse::error('Ha ocurrido un error al procesar su solicitud.', 500);
        }
    }

    public function eliminar_usuario($id)
    {
        try {
            $response = $this->UsuarioService->eliminar($id);
            return ApiResponse::success($response, "Usuario desactivado correctamente", 200);
        } catch (ValidationException $error) {
            return ApiResponse::error(
                'Error de validación en los datos enviados.',
                422,
                $error->errors()
            );
        } catch (\Throwable $th) {
            Log::error('Ha ocurrido un error - eliminar_usuario: ' . $th->getMessage(), ['exception' => $th]);
            return ApiResponse::error('Ha ocurrido un error al procesar su solicitud.', 500);
        }
    }

    public function listar_usuarios(Request $request): JsonResponse
    {
        try {
            $buscar = $request->get('q');
            $response = $this->UsuarioService->listar($buscar);

            return ApiResponse::success($response, "Usuarios obtenidos correctamente", 200);
        } catch (\Throwable $th) {
            Log::error('Error listar_usuarios: ' . $th->getMessage(), ['exception' => $th]);
            return ApiResponse::error('Ha ocurrido un error al procesar su solicitud.', 500);
        }
    }
}
