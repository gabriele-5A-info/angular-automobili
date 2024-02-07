import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WebserviceService } from '../service/webservice.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// const for the form
const maxLengthName: number = 30;
const minLengthName: number = 2;

const maxLengthPorte: number = 8;
const minLengthPorte: number = 1;

const annoMin: number = 1900;
const annoMax: number = parseInt(new Date().getFullYear().toString());

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{

  addCarForm: FormGroup;
  errorAddCar: boolean = false;
  successAddCar: boolean = false;

  constructor(public webService: WebserviceService) { 
    this.addCarForm = new FormGroup({
      marca: new FormControl('', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]),
      modello: new FormControl('', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]),
      anno: new FormControl('', [Validators.required, Validators.min(annoMin), Validators.max(annoMax)]),
      porte: new FormControl('', [Validators.required, Validators.min(minLengthPorte), Validators.max(maxLengthPorte)]),
      prezzo: new FormControl('', [Validators.required, Validators.min(0)]),
      colore: new FormControl('', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]),
      targa: new FormControl('', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName), Validators.pattern('^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$')]),
      cilindrata: new FormControl('', [Validators.required, Validators.min(0)]),
      nazione: new FormControl('', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]),
      km: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  htmlElement: any = [];
  async ngOnInit() {
    this.htmlElement = document.getElementsByClassName('animation-element');

    for (let i = 0; i < this.htmlElement.length; i++) {
      this.htmlElement[i].classList.add('animation-in');
      this.htmlElement[i].classList.remove('hide');
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    for(let i = 0; i < this.htmlElement.length; i++) {
      this.htmlElement[i].classList.remove('animation-in');
    }
  }

  async addCar(){
    let car = {
      marca: this.toCapitalize(this.addCarForm.value.marca),
      modello: this.toCapitalize(this.addCarForm.value.modello),
      anno: this.addCarForm.value.anno,
      nPorte: this.addCarForm.value.porte,
      prezzo: this.addCarForm.value.prezzo,
      colore: this.toCapitalize(this.addCarForm.value.colore),
      targa: this.addCarForm.value.targa.toUpperCase(),
      cilindrata: this.addCarForm.value.cilindrata,
      nazione: this.toCapitalize(this.addCarForm.value.nazione),
      km: this.addCarForm.value.km
    }

    await this.webService.addAuto('addAuto', car);
    console.table(this.webService.serverResponse);

    if(this.webService.serverResponse.status != 0) {
      this.errorAddCar = true;
      return;
    }

    this.successAddCar = true;
    this.addCarForm.reset();

    await new Promise(resolve => setTimeout(resolve, 2000));

    this.successAddCar = false;
  }

  toCapitalize(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
