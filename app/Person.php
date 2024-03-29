<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $primaryKey = 'PersonId';
    public $timestamps = false;
    protected $fillable = ['fname', 'lname'];

    public function fileuploads()
    {
        return $this->hasMany('App\Fileupload', 'PersonId');
    }
}
