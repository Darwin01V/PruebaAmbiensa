<?php

namespace App\Helpers;

class ApiResponse
{
    public static function success($data = null, $message = '', $code = 200)
    {
        return response()->json([
            'error' => false,
            'message' => $message,
            'code' => $code,
            'data' => $data,
        ], $code);
    }

    public static function error($message = '', $code = 500, $data = null)
    {
        return response()->json([
            'error' => true,
            'message' => $message,
            'code' => $code,
            'data' => $data,
        ], $code);
    }
}