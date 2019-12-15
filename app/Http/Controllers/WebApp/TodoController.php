<?php
namespace App\Http\Controllers\WebApp;

use App\Exceptions\WebAPIException;
use App\Http\Controllers\Controller;
use App\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller {
  public function search(Request $request){
    $name = $request->input('fields.name','');

    $todos = Todo::where('t_name','LIKE', "%$name%")->get();

    return response()->json([
      'results'=>$todos,
      'success'=> true,
      'count'=> $todos->count()
    ]);
  }

  public function create(Request $request){
    $validation = Validator::make($request->all(),['data'=>'required|array','data.name'=>'required']);

    if($validation->fails()){
      // Error WE4
      throw new WebAPIException('Required field is empty.',4);
    }

    $todo = Todo::create([
      't_name'=>$request->input('data.name')
    ]);

    return response()->json([
      'success'=>true,
      'message'=>'You have successfully created a todo task',
      'data'=> $todo
    ]);
  }

  public function update(Request $request){
    $validation = Validator::make($request->all(),['data'=>'required|array','data.name'=>'required','data.id'=>'required|exists:todo,t_id']);

    if($validation->fails()){
      // Error WE5
      throw new WebAPIException('Required field is empty.',5);
    }

    $todo = Todo::find($request->input('data.id'));

    $todo->t_name = $request->input('data.name');

    $todo->save();

    return response()->json([
      'success'=>true,
      'message'=>'You have successfully updated a todo task',
      'data'=> $todo
    ]);
  }

  public function delete(Request $request){
    $validation = Validator::make($request->all(),['id'=>'required|exists:todo,t_id']);

    if($validation->fails()){
      // Error WE6
      throw new WebAPIException('Required field is empty.',6);
    }

    $todo = Todo::find($request->input('id'));

    $todo->delete();

    return response()->json([
      'success'=> true,
      'message'=> "You have successfully deleted the todo task."
    ]);

  }
}
