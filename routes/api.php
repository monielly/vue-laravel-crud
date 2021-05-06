<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Contact API route */
$base_class = "App\Http\Controllers";

//fetch contact
Route::get('getContacts',
            $base_class.'\ContactController@getContacts');

//Save contact
Route::post('saveContact',
             $base_class.'\ContactController@saveContact');

//Edit contact
Route::get('editContact/{id}',
						$base_class.'\ContactController@editContact');

// Update contact
Route::post('updateContact/{id}',
						 $base_class.'\ContactController@updateContact');

// Delete contact
Route::delete('deleteContact/{id}',
               $base_class.'\ContactController@deleteContact');       