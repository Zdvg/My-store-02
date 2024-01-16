import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  //se carga en el html gracias al @Input en products

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private  route: ActivatedRoute
  ){}

  //Se toman los productos desde la Api (1)

  ngOnInit(): void {
    this.productsService.getProductsByPage(8,0)
     .subscribe(data => {
       this.products = data;
       this.offset += this.limit;
     });
     this.route.queryParamMap.subscribe(params =>{
       this.productId = params.get('product');
       console.log(this.productId);
     })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
