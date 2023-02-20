import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, NEVER, Observable } from 'rxjs';
import { customer } from '../customer';
import { CustomerService } from '../customer.service';


@Component({
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})

export class ListCustomerComponent implements OnInit {

  isFormEdit = false;
  isupdated = false;

  customers: any[] = [];
  customer: customer = {
    id: 0,
    name: '',
    gender: '',
    qualification: '',
    hobbies: '',
    status: '',

  };

  ngOnInit(): void {
    //this.isupdated = false;
    this.getCustomers();
  }
  constructor(private customerService: CustomerService,
               private _router:Router
              ) { }


  getCustomers() {
    this.customerService.getCusomerList()
      .pipe(map(responsedata => {
        const customerArray = [];
        for (const key in responsedata) {
          if (responsedata.hasOwnProperty(key)) {
            customerArray.push({ ...responsedata[key] })
          }
        }
        return customerArray;
      }))
      .subscribe(data => {
        console.log(data);
        this.customers = data;

      }
      )
  }

  deleteCustomer(customer: customer) {
    this.customerService.deleteCustomer(customer.id)
      .pipe(map(responsedata => {
        const customerArray = [];
        for (const key in responsedata) {
          if (responsedata.hasOwnProperty(key)) {
            customerArray.push({ ...responsedata[key] })
          }
        }
        return customerArray;
      }))
      .subscribe(data => {
        console.log(data);
        this.customers = data;
      }
      )
  }

  editCustomer(editCustomer: customer) {
    this.isFormEdit = false;
    this.customer.id = editCustomer.id
    this.customer = editCustomer;
    this._router.navigate(['/edit',this.customer.id]);
    console.log(editCustomer.id);
    console.log(editCustomer);
  }



}
