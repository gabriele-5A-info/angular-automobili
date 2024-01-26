import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WebserviceService } from '../service/webservice.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// const for the login
const maxLengthName: number = 20;
const minLengthName: number = 3;

const minLengthPassword: number = 20;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  
  constructor(public webService: WebserviceService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]],
      password: ['', [Validators.required, Validators.minLength(minLengthPassword)]]
    });
  }
  
  loginForm: FormGroup;


  async ngOnInit() {
    // this.webService.getUser('getUser', { username: 'Carlo', password: 'carlo' });

    // this.webService.visualizeAuto('visualizeAuto');

    // this.webService.getAuto('getAuto', { id: 1 });

    // this.webService.getAutoByMarca('getAutoByMarca', { marca: 'Jaguar' });

    // this.webService.addAuto('addAuto', {nome: 'Ferrari', marca: 'Ferrari', nPorte: 2, cilindrata: 2000, colore: 'rosso', anno: 2019, prezzo: 200000, targa: 'AA123BB', km: 0, nazione: 'Italia'});
  }
}
