import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  myShoppingCart: Product[] = []
  total = 0;
  showProductsDetail = false;

  @Input () products: Product[] = [];
  @Input () set  productId(id: string | null){
    if (id){
      this.onShowDetailsProduct(id);
    }
  };
  @Output () loadMore = new EventEmitter();


  productChosen: Product | null = null;;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onLoadMore(){
    this.loadMore.emit();
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductsDetail = !this.showProductsDetail;
  }

  onShowDetailsProduct(id: string){
    this.statusDetail = 'loading';
    if (!this.showProductsDetail){
      this.showProductsDetail= true;
    }
    this.productsService.getDetailsProducts(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string){
    this.productsService.getDetailsProducts(id)
    .pipe(
      switchMap((product) =>
        this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data =>{
      console.log(data);
    });
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: ['assets/images/ramoHojasRecicladas.jpg'],
      price: 1000,
      categoryId: 2,
    }
    console.log("Producto Nuevo creado", product)
    this.productsService.create(product)
   .subscribe(data => {                // Aquí genera un error
    this.products.unshift(data);
    });
  }

  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: 'change title',
      };
      const id = this.productChosen?.id;
      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductsDetail = false;
      });
    }
  }

}
