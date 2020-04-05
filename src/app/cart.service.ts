/*
Services are an integral part of Angular applications.
In Angular, a service is an instance of a class that you can make available to
any part of your application using Angular's dependency injection system.
Services are the place where you share data between parts of your application.
For this project (the online store), the cart service is where you store your cart data and methods.
*/

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CartService {
  items = [];

  constructor(
    private httpClient : HttpClient
  ) {}

  addToCart(product){
    this.items.push(product);
  }

  getItems(){
    return this.items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }

  getShippingPrices(){
    return this.httpClient.get('../assets/shipping.json');
  }

}
