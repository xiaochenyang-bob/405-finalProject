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

//authentication 
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
    // protected resources, only accessble after authorization
    Route::get('users/list', function(){
        $users = App\User::all();
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});

Route::group(['middleware' => 'api-header'], function () {
    // as users at that point have not been authenticated yet
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});

Route::get('test', 'TestController@index');
Route::post('test', 'TestController@store');
Route::get('test/{id}', 'TestController@show');
Route::post('upload/{id}', 'TestController@fileStore');

