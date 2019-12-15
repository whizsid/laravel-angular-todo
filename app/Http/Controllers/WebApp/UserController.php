<?php
namespace App\Http\Controllers\WebApp;

use App\Exceptions\WebAPIException;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller {
  public function login(Request $request){
    $validator = Validator::make($request->all(),['email'=>'required|exists:users,email','password'=>'required']);

    if($validator->fails()){
        // Error WE1
        throw new WebAPIException("User not found!",1);
    }

    if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
      $user = Auth::user();


      return response()->json([
        'success'=>true,
        'token'=>$user->createToken('WebApp')->accessToken,
        'user'=> $user,
        'message'=>'Successfully logged in. Please wait while redirecting to home page.'
      ]);
    } else {
      // Error WE2
      throw new WebAPIException("username or password incorrect. Please try again!",2);
    }

  }

  public function signup(Request $request){
    $validator = Validator::make($request->all(),['name'=>'required','email'=>'required|email','password'=>'required']);

    if($validator->fails()){
        // Error WE3
        throw new WebAPIException("Required fields not supplied!",3);
    }

    $user = User::create([
      'name'=>$request->input('name'),
      'email'=>$request->input('email'),
      'password'=> Hash::make($request->input('password'))
    ]);

    Auth::onceUsingId($user->getKey());

    $user = Auth::user();


    return response()->json([
      'success'=>true,
      'token'=>$user->createToken('WebApp')->accessToken,
      'user'=> $user,
      'message'=>'Successfully logged in. Please wait while redirecting to home page.'
    ]);

  }

  public function logout(){
    // Saving logout time to db

    return response()->json([
      'success'=> true,
      'message'=> " Successfully logged out. Please wait while redirecting to the home page."
    ]);
  }


  public function check(){
    return response()->json([
      'user'=> Auth::user(),
      'success'=> true
    ]);
  }
}
