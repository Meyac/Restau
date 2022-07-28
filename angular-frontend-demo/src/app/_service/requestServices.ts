import {BaseBackendService} from "./basebackEndService_Service";
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from "rxjs";
import { UrlConstants } from "../_constants/urlConstanst";
import { Cards, SpecificCard } from "types";

export class RequestServices extends BaseBackendService {
  getRestaurantData = async (url: string, httpParams?: SpecificCard) => {
    let additionalUrlParams: string = '';

    if(httpParams !== undefined) {
      additionalUrlParams = this.addHttpParams(httpParams);
    }

    const response = await fetch(url + additionalUrlParams, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.warn(url+additionalUrlParams);
    return await response.json();
    //.then(p => alert(JSON.stringify(p)))

  }

  addHttpParams(params: SpecificCard): string {
    let paramUrl = '?'

    for(let i = 0; i < params.length; i++) {
      //for(let t = 0; t < 2; t++) {
      //}
      paramUrl = paramUrl + `${params[i][1] !== '' || null ? params[i][0] + '=' + params[i][1] + '&' : ''}`;
    }
    return paramUrl;
  }

  deleteRestaurantEntery = async (name: string, location: string) => {
    const res = await fetch(UrlConstants.homePath + UrlConstants.pathDeleteRestau + `?name=${name}&location=${location}`, {
      method: 'DELETE',
    });

    return res;
  }

  createEntry = async (name: string, location: string, customers: number) => {
    const res = await fetch(UrlConstants.homePath+UrlConstants.pathAddNewRestau + `?name=${name}&location=${location}&customers=${customers}`, {
      method: 'POST'
    });

    return res;
  }

  modifyEntry = async (id: number, newName: string, newLocation: string, newCustomerCount: string) => {
    //alert('hello')
    let htmlParams = this.addHttpParams([['id', id], ['newName', newName], ['newLocation', newLocation], ['newCustomerCount', newCustomerCount === '' ? '' : parseInt(newCustomerCount)]])
    // alert(htmlParams);
    const res = await fetch(UrlConstants.homePath + UrlConstants.pathModifyEntry + htmlParams, {
      method: 'PUT'
    })

    return res;
  }

}
