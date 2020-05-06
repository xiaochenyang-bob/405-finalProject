<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->bigIncrements('PetId');
            $table->unsignedBigInteger('UserId');
            $table->string('Filename');
            $table->string('Species');
            $table->string('Breed');
            $table->string('Gender');
            $table->integer('Age');
            $table->string('Name');
            $table->text('Description');
            $table->timestamps(); //created_at, updated_at
            $table->foreign('UserId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pets');
    }
}
