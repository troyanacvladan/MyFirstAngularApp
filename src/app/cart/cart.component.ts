import {Component, OnInit} from '@angular/core';
import {products} from '../products';
import {CartService} from '../cart.service';
import {ShippingComponent} from '../shipping/shipping.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  selectedItems;

  constructor(
    private serviceCart: CartService
  ) {
  }

  ngOnInit() {
    this.selectedItems = this.serviceCart.getItems()
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
