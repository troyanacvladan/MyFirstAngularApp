// Ova datoteka sadrži 'imports' i 'functionality' koja je dostupna celoj aplikaciji.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ProductListComponent} from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartService} from './cart.service';
import {CartComponent} from './cart/cart.component';
import {ShippingComponent} from './shipping/shipping.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PencilToolComponent } from './pencil-tool/pencil-tool.component';
import { PaintToolComponent } from './paint-tool/paint-tool.component';
import {CanvasWhiteboardModule} from "ng2-canvas-whiteboard";
import { Ng2CanvasWhiteboardComponent } from './canvas-whiteboard/ng2-canvas-whiteboard.component';


@NgModule({

  // place where we declare all components classes:
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    PencilToolComponent,
    PaintToolComponent,
    Ng2CanvasWhiteboardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CanvasWhiteboardModule
    ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
