<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Person;
use App\Fileupload;

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
       $image = Person::find($id)->fileuploads;
       $data = [
            'person' => $person,
            'image' => $image
       ];    
       return \json_encode($data);
   }


   public function fileStore($id, Request $request)
   {
    if($request->get('file'))
       {
          $image = $request->get('file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('file'))->save(public_path('images/').$name);
        }

        $fileupload = new Fileupload();
        $fileupload->filename=$name;
        $fileupload->PersonId = $id;
        $fileupload->save();
        return response()->json('Successfully added');
   }
}
