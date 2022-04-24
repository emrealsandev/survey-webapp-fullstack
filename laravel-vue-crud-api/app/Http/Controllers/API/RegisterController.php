<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;

class RegisterController extends BaseController
{

    public function register(Request $request){
        $validator = Validator::make($request->all(),[ 
            'email' => 'required | email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validasyon hatası',$validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['email'] = $user->email;

        return $this->sendResponse($success,'Kullanıcı Başarıyla Kaydedildi.');



    }




    public function login(Request $request){
        if (Auth::attempt(['email'=> $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['email'] = $user->email;

            return $this->sendResponse($success,'Başarıyla Giriş Yapıldı.');

        }else{
            return $this->sendError('Giriş Yapılamadı', ['error'=>'Giriş Yapılamadı']);
        }
    }





}
