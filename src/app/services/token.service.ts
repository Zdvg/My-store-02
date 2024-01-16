import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token); //'token' es la llave del dato token
  }

  getToken(){
    const token = localStorage.getItem('token'); //para recuperar los datos pasamos el parámetro de la llave 'token'
    return token;
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
