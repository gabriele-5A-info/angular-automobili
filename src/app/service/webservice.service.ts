import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private connectionService: ConnectionService) { }

  serverResponse: any = [];

  /**
   * @description: get the user from the server if the parameters are correct (username and password)
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns The data are saved in the serverResponse variable
   */
  getUser(endPoint: string, par: any) {
    this.connectionService.sendPostRequest(endPoint, par).subscribe(
      (data: any) => {
        console.log(data);
        this.serverResponse = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * @description: get all the cars from the server
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @returns The data are saved in the serverResponse variable
   */
  visualizeAuto(endPoint: string) {
    this.connectionService.sendGetRequest(endPoint).subscribe(
      (data: any) => {
        console.log(data);
        this.serverResponse = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * @description: get the car from the server if the parameters are correct (id)
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns The data are saved in the serverResponse variable
   */
  getAuto(endPoint: string, par: any) {
    this.connectionService.sendPostRequest(endPoint, par).subscribe(
      (data: any) => {
        console.log(data);
        this.serverResponse = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * @description: get all the cars from the server if the parameters are correct (marca)
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns The data are saved in the serverResponse variable
   */
  getAutoByMarca(endPoint: string, par: any) {
    this.connectionService.sendPostRequest(endPoint, par).subscribe(
      (data: any) => {
        console.log(data);
        this.serverResponse = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /**
   * @description: add a car to the server if the parameters are correct 
   * (nome, marca, nPorte, cilindrata, colore, anno, prezzo, targa, km and nazione)
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns The data are saved in the serverResponse variable
   */
  addAuto(endPoint: string, par: any) {
    this.connectionService.sendPostRequest(endPoint, par).subscribe(
      (data: any) => {
        console.log(data);
        this.serverResponse = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
