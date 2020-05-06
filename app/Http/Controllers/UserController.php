<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required',
            'email' => 'required|email'
        ]);

        $user = \App\User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)) 
        {
            //pass word matched
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];           
        }
        else 
        {
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];
        }
      
        return response()->json($response, 201);
    }

    public function register(Request $request)
    { 
        $request->validate([
            'password' => 'required|min:6',
            'name' => 'required|max:10',
            'email' => 'required|email'
        ]);

        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];        
        $user = new \App\User($payload);
        if ($user->save())
        {
            $token = self::getToken($request->email, $request->password); // generate user token
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            $user = \App\User::where('email', $request->email)->get()->first();
            $user->auth_token = $token; // update user token
            $user->save();
            $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];        
        }
        else{
            $response = ['success'=>false, 'data'=>'Couldnt register user'];
        }
    
        return response()->json($response, 201);
    }

    public function find($name){
        $user= User::where('Name', 'LIKE','%'.$name.'%')
                ->orderBy('created_at')
                ->get();
        return $user->toJson();
    }

    public function select($name){
        $user= User::where('Name', 'LIKE','%'.$name.'%')
                ->orderBy('created_at')
                ->first();
        $user = [
            'user' => $user,
            'contacts' => $user->contacts
        ];
        return \json_encode($user);
    }

    public function addContact($id1, $id2){
        DB::table('contacts')->insert([
            'User1Id' => $id1,
            'User2Id' => $id2
        ]);

        DB::table('contacts')->insert([
            'User1Id' => $id2,
            'User2Id' => $id1
        ]);

        return response()->json('Successfully added relationship');
    }

    public function contact($id){
        $contacts = User::find($id)->contacts;
        return \json_encode($contacts);
    }

}
