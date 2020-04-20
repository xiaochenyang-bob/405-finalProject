<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
   public function index(){
       $test_variable = 666;
        return view('test.test1', [
            'test_variable' => $test_variable
        ]);
   }

   public function testForm(Request $request){
        $fname = $request->input('fname');
        $lname = $request->input('lname');
        $agree = $request->input('agree');
        // console.log($lname);
        // console.log($agree);
        // return redirect()
        //     ->route('test');
        return view('test.test2', [
            'fname' => $fname,
            'lname' => $lname,
            'agree' => $agree
        ]);
        //return $request->all();
   }
}
