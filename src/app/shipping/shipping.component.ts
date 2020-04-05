import {Component, OnInit} from '@angular/core';
import {products} from '../products';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  shippingPrices;

  constructor(
    private serviceCart: CartService
  ) {
  }

  ngOnInit() {
    this.shippingPrices = this.serviceCart.getShippingPrices();
  }
}
