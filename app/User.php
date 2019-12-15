<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $primaryKey = 'u_id';

    protected $dates = [
      'created_at', 'updated_at'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    public function toArray()
    {
      return [
        'id'=>$this->getKey(),
        'name'=> $this->name,
        'email'=> $this->email,
        'createdDate' => $this->created_at->format('Y-m-d'),
        'updatedDate' => $this->updated_at->format('Y-m-d')
      ];
    }
}
