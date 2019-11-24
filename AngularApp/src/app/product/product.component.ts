import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]

})
export class ProductComponent implements OnInit {
  //declaring variables 
  selectedProduct = new Product("","", "", 0, 1,"","");
  listOfProducts: Product[];

  //constructor 
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listOfProducts=[]; //initializing the list of product to an empty array
  }

  addProduct(){
    this.productService.postProduct(this.selectedProduct).subscribe((res)=> {
      console.log('response: ', res);
      this.getAllProducts();//refreshes the list or products 
    });
  }

  //gets all the products from the database by calling the function in the service file
  getAllProducts(){
    this.productService.getProducts().subscribe((res) => {
      this.listOfProducts = res as Product[]; //casting the object as an array
      console.log('response: ', res);

    });   
  }

  //the id is sent to the function through the button in html 
  deleteProduct(productId: string) {
    this.productService.delProduct(productId).subscribe((res) => {
      console.log('response: ', res);
      this.getAllProducts(); //refreshes the list or products 
    });
  }
  
}

