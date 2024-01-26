import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  private URL_SERVICE = 'http://localhost:1337/';

  /**
   * @description: Send a POST request to the server
   * @param {any} endPoint: The endpoint of the request (name of the service)
   * @returns The response of the server
   */
  public sendGetRequest(endPoint: any) {
    console.log(this.URL_SERVICE + endPoint);
    return this.httpClient.get(this.URL_SERVICE + endPoint);
  }

  /**
   * @description: Send a POST request to the server
   * @param {any} endPoint: The endpoint of the request (name of the service)
   * @param {any} par: The parameters of the request
   * @returns The response of the server
   */
  public sendPostRequest(endPoint: any, par: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.httpClient.post(this.URL_SERVICE + endPoint, par, options);
  }
}
