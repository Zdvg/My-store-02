import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  product: Product | null = null
  productId: string | null = null

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,

    private location: Location,
  ){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap( params => {
      this.productId = params.get('id');
      if (this.productId){
        return this.productsService.getDetailsProducts(this.productId)
      }
      return [null];
      }))
      .subscribe(data => {
        this.product =data;
    });
  }

  goToBack(){
    this.location.back();
  }

}
