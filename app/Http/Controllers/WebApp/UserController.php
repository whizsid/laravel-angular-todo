<?php
namespace App\Http\Controllers\WebApp;

use App\Http\Controllers\Controller;

class UserController extends Controller {
  public function login(){
    return response()->json([
      'success'=>true,
      'message'=>'Successfully logged in. Please wati while you redirecting to the home page',
      'user'=> [
        'name'=>'Ramesh Kithsiri',
        'email'=>'whizsid@aol.com',
        'id'=>1,
        'createdDate'=> '2019-10-11 12:30:00',
        'updatedDate'=> '2019-10-11 12:30:00',
        'avatarUrl'=> 'http://127.0.0.1/storage/images/jnkjnk.jpg'
      ],
      'token'=>'jnjknkjdsJNJKNKJkknknkjnjk'
    ]);
  }
}
