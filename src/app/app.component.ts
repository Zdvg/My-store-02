import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;
  token = ''; //Se guarda en memoria

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService,
  ){

  }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile()
      .subscribe() // Se necesita el subscribe para que se ejecute
    }
  }

  createUser(){
    this.usersService.create({
      name: 'Dayan',
      email: 'dayan@gmail.com',
      password: '1456',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  downloadpdf(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

}
