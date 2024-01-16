import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { catchError, retry, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
    ) { }

  getByCategory(categoryId: string, limit: number, offset: number){
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${environment.API_URL}/categories/${categoryId}/products`,{params})
  }

  getProductsByPage(limit: number, offset: number){                            //Reemplaza getAllProducts
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${environment.API_URL}/products/`,{params, context: checkTime()})
    .pipe(                                                // checkTime, de lo contrario se ejecuta para todas las peticiones
      retry(2),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
    })));
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getDetailsProducts(id),
      this.update(id, {title: 'nuevo'})
    )
  }

  getDetailsProducts(id: string){  // getProduct
    return this.http.get<Product>(`${environment.API_URL}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500){
          return throwError('Algo está fallando en el serve');
        }
        if (error.status === 404){
          return throwError('El producto no existe');
        }
        return throwError('Ups, algo salió mal');
      })
    )
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${environment.API_URL}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${environment.API_URL}/products/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${environment.API_URL}/products/${id}`)
  }
}
