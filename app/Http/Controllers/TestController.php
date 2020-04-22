<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Person;

class TestController extends Controller
{
   public function index(){
    //    $test_variable = 666;
    //     return view('test.test1', [
    //         'test_variable' => $test_variable
    //     ]);
        $people = Person::orderBy('fname')->get();
        return $people->toJson();
   }

   public function store(Request $request){
        $validatedData = $request->validate([
            'fname' => 'required|max:5',
            'lname' => 'required|max:5'
        ]);

        // $person = new Person();
        // $person->fname = $validatedData['fname'];
        // $person->lname = $validatedData['lname'];
        // $person.save();    
        $person = Person::create([
            'fname' => $validatedData['fname'],
            'lname' => $validatedData['lname']
        ]);
        return response()->json('Person created!');
   }

   public function show($id)
   {
       $person = Person::find($id);
       return $person->toJson();
   }
}
