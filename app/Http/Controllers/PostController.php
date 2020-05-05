<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;

class PostController extends Controller
{
    public function index(){
        $posts = Post::orderBy("created_at", 'desc')->get();
        foreach ($posts as &$post){
            $post = [
                'post' => $post,
                'user' => $post->user
            ];
        }
        return \json_encode($posts);
    }

    public function store($id, Request $request)
    {
        $request->validate([
            'text' => 'required|min:10',
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
        $post = new Post();
        $post->Text = $request->text;
        $post->Filename = $name;
        $post->UserId = $id;
        $post->save();

        return response()->json('Successfully posted!');
    }

    public function delete($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->json('Successfully deleted post!');
    }
}
