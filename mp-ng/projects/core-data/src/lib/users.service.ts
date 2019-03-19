import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private model = 'users'
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get(`${BASE_URL}${this.model}`)
  }

  byId(id) {
    return this.httpClient.get(`${BASE_URL}${this.model}/${id}`)
  }

  create(data) {
    console.log('user to create ', data)
    return this.httpClient.post(`${BASE_URL}${this.model}`, data)
  }

  update(data) {
    console.log('user to update ', data)
    return this.httpClient.patch(`${BASE_URL}${this.model}/${data.id}`, data)
  }

  del(id) {
    return this.httpClient.delete(`${BASE_URL}${this.model}/${id}`)
  }
}
