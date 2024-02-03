import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { __addDisposableResource } from 'tslib';
import { WebserviceService } from '../service/webservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements  OnInit{

  constructor(private router: Router, public webService: WebserviceService) { }

  btns: any = [];

  async ngOnInit() {
    this.btns = document.getElementsByClassName('btn');

    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].classList.add('animation-in');
      this.btns[i].classList.remove('hide');
      
      await new Promise(resolve => setTimeout(resolve, 750));
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    for(let i = 0; i < this.btns.length; i++) {
      this.btns[i].classList.remove('animation-in');
    }
  }

  async routerLogin() {
    console.log('login');

    for(let i = this.btns.length - 1; i >= 0; i--) {
      this.btns[i].classList.add('animation-out');
      
      await new Promise(resolve => setTimeout(resolve, 750));

      this.btns[i].classList.add('hide');
    }

    this.router.navigate(['/login']);
  }

  async routerCars() {
    console.log('cars');

    for(let i = this.btns.length - 1; i >= 0; i--) {
      this.btns[i].classList.add('animation-out');
      
      await new Promise(resolve => setTimeout(resolve, 750));

      this.btns[i].classList.add('hide');
    }

    this.router.navigate(['/viewCars']);
  }

  async routerAddCar() {
    console.log('addCar');

    for(let i = this.btns.length - 1; i >= 0; i--) {
      this.btns[i].classList.add('animation-out');
      
      await new Promise(resolve => setTimeout(resolve, 750));

      this.btns[i].classList.add('hide');
    }

    this.router.navigate(['/addCar']);
  }
}
