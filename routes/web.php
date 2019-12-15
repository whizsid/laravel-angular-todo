<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['prefix'=>'user'],function(){
  Route::post('login','UserController@login');
  Route::post('signup','UserController@signup');
  Route::group(['middleware'=>'auth:api'],function(){
    Route::post('logout','UserController@logout');
    Route::post('check','UserController@check');
  });
});

Route::group(['middleware'=>'auth:api','prefix'=>'/crud/todo'],function(){
  Route::post('search','TodoController@search');
  Route::post('create','TodoController@create');
  Route::post('update','TodoController@update');
  Route::post('delete','TodoController@delete');
});


Route::view('/{path?}', 'angular')
     ->where('path', '.*')
     ->name('angular');
