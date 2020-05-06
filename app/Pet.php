<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $primaryKey = 'PetId';
    protected $fillable = ['Species', 'Filename', 'UserId', 'Breed', 'Gender', 'Age', 'Name', 'Description'];
    
    public function user(){
        return $this->belongsTo('App\User', 'UserId');
    }
}
