<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $primaryKey = 'PostId';
    protected $fillable = ['Text', 'Filename', 'UserId'];

    public function user(){
        return $this->belongsTo('App\User', 'UserId');
    }
}
