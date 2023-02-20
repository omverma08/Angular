import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 
  constructor(private http:HttpClient) { } 


  private baseUrl = 'http://localhost:8080/customer-app/api/';
  
  getCusomerList():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'customers');

  }
  
  insertCustomer(newCustomer:customer):Observable<any>{
    return this.http.post(`${this.baseUrl}`+'customer',newCustomer);

  }

  deleteCustomer(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}`+'customer/'+id);

  }
  updateCustomer(updatedCustomer:customer):Observable<any>{
    console.log(`${this.baseUrl}`+'customer',updatedCustomer);
    console.log(updatedCustomer);
    return this.http.put(`${this.baseUrl}`+'customer',updatedCustomer);

  }

  getCusomerById(id:number){
    console.log(`${this.baseUrl}`+'customer/'+id);
    return this.http.get(`${this.baseUrl}`+'customer/'+id);
  }
}
