<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/test', 'TestController@index')->name("test");
Route::post('/test', 'TestController@testForm');
