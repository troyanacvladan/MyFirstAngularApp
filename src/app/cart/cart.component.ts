import {Component, OnInit} from '@angular/core';
import {products} from '../products';
import {CartService} from '../cart.service';
/*
Angular's FormBuilder service provides convenient methods for generating controls.
It provides syntactic sugar that shortens creating instances
of a FormControl, FormGroup, or FormArray (three fundamental building blocks of Angular forms).
It reduces the amount of boilerplate needed to build complex forms.
*/
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  selectedItems;
  checkoutForm;


  constructor(
    private cartService: CartService,
    private formBuilderService: FormBuilder
  ) {

    /*
    Da biste okupili the user's name and address, set the checkoutForm property with a form model
    containing name and address fields, using the FormBuilder group() method.
    This method construct a new FormGroup instance.
    FormGroup instance tracks the value and validity state of a group of FormControl instances. Explanation:
    A FormGroup aggregates the values of each child FormControl into one object, with each control name as the key.
    It calculates its status by reducing the status values of its children.
    For example, if one of the controls in a group is invalid, the entire group becomes invalid.
    */
    this.checkoutForm = this.formBuilderService.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.selectedItems = this.cartService.getItems()
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  /*
  For the checkout process, users need to submit their name and address.
  When they submit their order, the form should reset and the cart should clear.
   In a real-world app, this method would also submit the data to an external server.
  */
  onSubmit(customerData){
    // Process checkout data here
    this.selectedItems = this.cartService.clearCart();
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }
}
