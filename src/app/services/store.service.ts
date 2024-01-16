import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []
  private myCart = new BehaviorSubject<Product[]>([]); //Estado compartido

  myCart$ = this.myCart.asObservable(); // $ -> Es un observable. Escuchar activamnte cambios
  total = 0;

  constructor() { }

  addProduct(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    return this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
