<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('test', 'TestController@index');
Route::post('test', 'TestController@store');
Route::get('test/{id}', 'TestController@show');
Route::post('upload/{id}', 'TestController@fileStore');

