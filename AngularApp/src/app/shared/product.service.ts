import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL = "http://localhost:8080/products"

  constructor( private http: HttpClient) {}

  //to add a product to the database by calling the backend 
  postProduct(pro : Product){
    const options = { responseType: 'text' as 'json' };
    return this.http.post(this.baseURL+"/create",pro,options);
  }
  // to get all the products from the database by calling the backend 
  getProducts() {
    return this.http.get(this.baseURL + "/items");
  }
  //to delete a certain product using id by calling the backend 
  delProduct(productId: String) {
    const options = { responseType: 'text' as 'json' };
    return this.http.delete(this.baseURL+"/delete/"+productId, options);
  }
}

