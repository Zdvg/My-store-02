import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable(); // Observadores

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile(){                            // Nombrado como getProfile
    //const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user)))
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile())
    )
  }

  logout(){
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
