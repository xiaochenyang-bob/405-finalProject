<?php

use Illuminate\Support\Facades\Route;
use App\Person;

// Route::get('/', function () {
//     return view('app');
// });

// Route::get('/test', 'TestController@index');
// Route::post('/test', 'TestController@store');
Route::view('/{path?}', 'app');

// Route::get('/eloquent', function(){
//     $person = Person::create([
//         'fname' => "Bob",
//         'lname' => "yang",
//     ]);

//     return Person::all();
// });
