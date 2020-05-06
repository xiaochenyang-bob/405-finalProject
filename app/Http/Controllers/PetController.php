<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pet;
use App\User;

class PetController extends Controller
{
    public function show($id)
    {
        $user = User::find($id);
        $pets = $user->pets;
        foreach ($pets as &$pet){
            $pet = [
                'pet' => $pet,
                'user' => $pet->user
            ];
        }
        return \json_encode($pets);
    }

    public function single($id)
    {
        $pet = Pet::find($id);
        $pet = [
            'pet' => $pet,
            'user' => $pet->user
        ];
        return \json_encode($pet);
    }

    public function store($id, Request $request)
    {
        $request->validate([
            'description' => 'required|min:10',
            'species' => 'required',
            'breed' => 'required',
            'gender' => 'required',
            'age' => 'required',
            'name' => 'required',
        ]);

       if($request->get('file'))
       {
          $image = $request->get('file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('file'))->save(public_path('images/').$name);
        }
        else
        {
            $name="";
        }
        $pet = new Pet();
        $pet->Species = $request->species;
        $pet->Breed = $request->breed;
        $pet->Gender = $request->gender;
        $pet->Age = $request->age;
        $pet->Name = $request->name;
        $pet->Description = $request->description;
        $pet->Filename = $name;
        $pet->UserId = $id;
        $pet->save();

        return response()->json('Successfully created Pet!');
    }

    public function edit($id, Request $request)
    {
        $request->validate([
            'description' => 'required|min:10',
            'species' => 'required',
            'breed' => 'required',
            'gender' => 'required',
            'age' => 'required',
            'name' => 'required',
        ]);
        
        $pet= Pet::find($id);

        if($request->get('file'))
        { 
          $image = $request->get('file');
          $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
          \Image::make($request->get('file'))->save(public_path('images/').$name);
          $pet->Filename = $name;
        }

        $pet->Species = $request->species;
        $pet->Breed = $request->breed;
        $pet->Gender = $request->gender;
        $pet->Age = $request->age;
        $pet->Name = $request->name;
        $pet->Description = $request->description;
        $pet->save();

        return response()->json('Successfully edited Pet!');
    }

    public function delete($id)
    {
        $pet = Pet::find($id);
        $pet->delete();
        return response()->json('Successfully deleted pet!');
    }

    public function all()
    {
        $pets = Pet::orderBy('created_at', 'desc')->get();
        foreach ($pets as &$pet){
            $pet = [
                'pet' => $pet,
                'user' => $pet->user
            ];
        }
        return \json_encode($pets);
    }

    public function filter($species)
    {
        $pets = Pet::where('Species', 'LIKE','%'.$species.'%')
                ->orderBy('created_at')
                ->get();
        foreach ($pets as &$pet){
            $pet = [
                'pet' => $pet,
                'user' => $pet->user
            ];
        }
        return \json_encode($pets);
        
    }
}
