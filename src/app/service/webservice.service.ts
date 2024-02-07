import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private connectionService: ConnectionService) { }

  serverResponse: any = [];
  auto: any = [];
  userData: any = [];
  buy: any = [];
  models: any = [];

  /**
   * @description: get the user from the server if the parameters are correct (username and password)
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns {Promise<any>} The data are saved in the serverResponse variable and in the userData variable (to use in the login component)
   */
  async getUser(endPoint: string, par: any): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log(data);
          this.serverResponse = data;
          this.userData = data;
          resolve(this.serverResponse);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: get all the cars from the server
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @returns {Promise<any>} The data are saved in the serverResponse variable
   */
  async visualizeAuto(endPoint: string): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendGetRequest(endPoint).subscribe(
        (data: any) => {
          console.log(data);
          this.serverResponse = data;
          resolve(this.serverResponse);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: get the car from the server if the parameters are correct (id)
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns {Promise<any>} The data are saved in the auto variable
   */
  async getAuto(endPoint: string, par: any): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log(data);
          this.auto = data;
          resolve(this.auto);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: get all the cars from the server if the parameters are correct (marca)
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns {Promise<any>} The data are saved in the serverResponse variable
   */
  async getAutoByMarca(endPoint: string, par: any): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log(data);
          this.serverResponse = data;
          resolve(this.serverResponse);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: save the car in the log table (to buy it)
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns {Promise<any>} The data are saved in the buy variable
   */
  async buyAuto(endPoint: string, par: any): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log(data);
          this.buy = data;
          resolve(this.buy);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: add a car to the server if the parameters are correct 
   * (nome, marca, nPorte, cilindrata, colore, anno, prezzo, targa, km and nazione)
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns {Promise<any>} The data are saved in the serverResponse variable
   */
  async addAuto(endPoint: string, par: any): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log(data);
          this.serverResponse = data;
          resolve(this.serverResponse);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }

  /**
   * @description: get all the models from the server
   * @async
   * @param {string} endPoint: The endpoint of the request (name of the service)
   * @returns {Promise<any>} The data are saved in the models variable
   */
  async getModels(endPoint: string): Promise<any> {
    await new Promise((resolve, reject) => {
      this.connectionService.sendGetRequest(endPoint).subscribe(
        (data: any) => {
          console.log(data);
          this.models = data;
          resolve(this.models);
        },
        (error: any) => {
          console.log(error);
          reject();
        }
      );
    });
  }
}
