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

Route::group(['middleware' => 'jwt.auth'], function () {
    // protected resources, only accessble after authorization
    Route::get('users/list', function(){
        $users = App\User::orderBy('Name')->get();
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
    Route::get('user/name/{name}', 'UserController@find');
    Route::get('user/name/select/{name}', 'UserController@select');
    Route::get('user/contact/{id}', 'UserController@contact');
    Route::get('post', 'PostController@index');
    Route::post('post/delete/{id}', 'PostController@delete');
    Route::post('post/{id}', 'PostController@store');
    Route::post('pet/create/{id}', 'PetController@store');
    Route::get('pet/get/{id}', 'PetController@show');
    Route::get('pet/single/{id}', 'PetController@single');
    Route::post('pet/edit/{id}', 'PetController@edit');
    Route::post('pet/delete/{id}', 'PetController@delete');
    Route::post('contacts/add/{id1}/{id2}', 'UserController@addContact');
});

Route::group(['middleware' => 'api-header'], function () {
    // as users at that point have not been authenticated yet
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
    Route::get('pet/all', 'PetController@all');
    Route::get('pet/species/{species}', 'PetController@filter');
    Route::get('test', 'TestController@index');
    Route::post('test', 'TestController@store');
    Route::get('test/{id}', 'TestController@show');
    Route::post('upload/{id}', 'TestController@fileStore');
});



