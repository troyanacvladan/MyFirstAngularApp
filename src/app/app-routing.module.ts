import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import {ShippingComponent} from './shipping/shipping.component';

/*
The Angular Router displays components based on the browser's URL and your defined routes.
The Angular Router enables you to show different components and data
to the user based on where the user is in the application. The router enables
navigation from one view to the next as users perform tasks such as
clicking links on the page to navigate to a new page. In this
manner we add routes for specific pages:
 */
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shipping', component: ShippingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
