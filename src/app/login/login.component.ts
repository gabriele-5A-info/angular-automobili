import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WebserviceService } from '../service/webservice.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// const for the login
const maxLengthName: number = 20;
const minLengthName: number = 3;

const minLengthPassword: number = 2;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorName: boolean = false;
  errorPassword: boolean = false;
  
  constructor(public webService: WebserviceService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(minLengthName), Validators.maxLength(maxLengthName)]],
      password: ['', [Validators.required, Validators.minLength(minLengthPassword)]]
    });
  }
  
  async login() {
    await this.webService.getUser('getUser', { username: this.loginForm.value.name, password: this.loginForm.value.password });

    if(this.webService.serverResponse.status != 0) {
      this.errorName = true;
      this.errorPassword = true;
      return;
    }

    this.router.navigate(['/home']);
  }

  resetError(error: string) {
    switch(error) {
      case 'name':
        this.errorName = false;
        break;
      case 'password':
        this.errorPassword = false;
        break;
    }
  }

  async ngOnInit() {
    // this.webService.getUser('getUser', { username: 'Carlo', password: 'carlo' });

    // this.webService.visualizeAuto('visualizeAuto');

    // this.webService.getAuto('getAuto', { id: 1 });

    // this.webService.getAutoByMarca('getAutoByMarca', { marca: 'Jaguar' });

    // this.webService.addAuto('addAuto', {nome: 'Ferrari', marca: 'Ferrari', nPorte: 2, cilindrata: 2000, colore: 'rosso', anno: 2019, prezzo: 200000, targa: 'AA123BB', km: 0, nazione: 'Italia'});
  }
}
