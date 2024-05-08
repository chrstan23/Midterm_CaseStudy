<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// product and cartsapi end points
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/carts', [CartController::class, 'index']);
Route::get('/carts/{id}', [CartController::class, 'show']);
Route::post('/adds', [CartController::class, 'store']);
Route::put('/adds/{id}', [CartController::class, 'update']);
Route::delete('/removes/{id}', [CartController::class, 'destroy']);
Route::delete('/removes', [CartController::class, 'removeAll']);
