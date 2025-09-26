<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\VerifyHmac;


Route::middleware([VerifyHmac::class])->group(function () {
    Route::get('/users', function () {
        return response()->json([
            ["id" => 1, "name" => "Alice", "email" => "alice@test.com"],
            ["id" => 2, "name" => "Bob", "email" => "bob@test.com"],
        ]);
    });

    // 你还可以加更多受保护的接口...

    Route::post('/login', function (\Illuminate\Http\Request $request) {
        $data = $request->only(['email', 'password']);

        if ($data['email'] === 'admin@test.com' && $data['password'] === 'secret') {
            return response()->json([
                'token' => 'fake-jwt-token-123456'
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    });
});