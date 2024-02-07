import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WebserviceService } from '../service/webservice.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit{
  
  savedCars: any = [];
  model: string = '0';

  constructor(public webService: WebserviceService) {
  }

  async ngOnInit() {
    await this.webService.visualizeAuto("visualizeAuto");
    this.savedCars = this.webService.serverResponse.data;
    await this.webService.getModels("getModels");
  }

  filterModel() {
    if (this.model == '0') {
      this.webService.serverResponse.data = this.savedCars;
    } else {
      this.webService.serverResponse.data = this.savedCars.filter((car: any) => {
        return car.codMarca == this.model;
      });
    }
  }

  auto: any = null;
  async showCar(id: string) {
    console.log(id);

    document.getElementById('card-' + id)?.classList.remove('animation-appear');
    document.getElementById('card-' + id)?.classList.add('animation-disappear');

    await new Promise(resolve => setTimeout(resolve, 500));

    document.getElementById('card-' + id)?.classList.remove('animation-disappear');
    document.getElementById('card-' + id)?.classList.add('hide');

    await this.webService.getAuto("getAuto", { id: id });
    this.auto = this.webService.auto.data[0];

    console.log(this.auto);
  }

  async back(id: string) {
    document.getElementById('card-' + id)?.classList.remove('hide');
    document.getElementById('card-' + id)?.classList.add('animation-appear');
    document.getElementById('cardShow')?.classList.remove('animation-card-pop');
    document.getElementById('cardShow')?.classList.add('animation-disappear');

    await new Promise(resolve => setTimeout(resolve, 500));

    document.getElementById('card-' + id)?.classList.remove('animation-appear');
    document.getElementById('cardShow')?.classList.remove('animation-disappear');
    document.getElementById('cardShow')?.classList.add('hide');

    this.auto = null;
  }

  async buy(id: string) {
    document.getElementById('card-' + id)?.classList.remove('hide');
    document.getElementById('card-' + id)?.classList.add('animation-appear');
    document.getElementById('cardShow')?.classList.remove('animation-card-pop');
    document.getElementById('cardShow')?.classList.add('animation-disappear');

    await new Promise(resolve => setTimeout(resolve, 500));

    document.getElementById('card-' + id)?.classList.remove('animation-appear');
    document.getElementById('cardShow')?.classList.remove('animation-disappear');
    document.getElementById('cardShow')?.classList.add('hide');
  
    await this.webService.buyAuto("buyAuto", { idModello: id, idUser: this.webService.userData.data[0].id });

    this.auto = null;
  }
}
