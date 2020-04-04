import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit {
  COST_FOR_NOTIFICATION = 700;
  @Input() product;

  /*
   This allows the product-alert component to emit an event (in product-alerts.component.html) when
   the value of this property changes (in product-list.component.html).
  */
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
