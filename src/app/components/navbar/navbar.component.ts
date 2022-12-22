import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logo: string;

  constructor() {
    this.logo = '../../../../assets/img/logo.png';
  }

  ngOnInit(): void {}
}
