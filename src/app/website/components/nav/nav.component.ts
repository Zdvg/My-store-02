import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{ //Nos va avisar cada cambio que haya y mostrará la lista de productos actualizada
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data =>{
      this.categories = data;
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  //getProfile(){
  //  this.authService.profile()
  //  .subscribe(user => {
  //    this.profile = user;
  //  });
  //}
}
