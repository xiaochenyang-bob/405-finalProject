<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fileupload extends Model
{
    protected $primaryKey = 'FileuploadId';
    protected $fillable = ['filename', 'PersonId'];
    public $timestamps = false;

    public function person()
    {
        return $this->belongsTo('App\Person', 'PersonId');
    }
}
