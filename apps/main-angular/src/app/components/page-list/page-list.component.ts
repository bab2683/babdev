import { Component, OnInit } from '@angular/core';

import { Pages } from '@constants';

@Component({
  selector: 'babdev-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  pages = Pages;

  constructor() {}

  ngOnInit() {}
}
