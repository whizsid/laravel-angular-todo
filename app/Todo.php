<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model {
  use SoftDeletes;

  protected $table = 'todo';

  protected $primaryKey = 't_id';

  protected $dates = [
    'created_at', 'updated_at', 'deleted_at'
  ];

  protected $fillable = [
    't_name'
  ];

  public function toArray()
  {
    return [
      'id'=> $this->getKey(),
      'name'=> $this->t_name,
      'createdDate'=> $this->created_at->format('Y-m-d'),
      'updatedDate'=> $this->updated_at->format('Y-m-d')
    ];
  }
}
