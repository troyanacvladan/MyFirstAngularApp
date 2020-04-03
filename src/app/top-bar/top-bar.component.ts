import { Component, OnInit } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  products = products;
  constructor() {
  }

  ngOnInit() {
  }
}
