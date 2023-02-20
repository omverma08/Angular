import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, NEVER, Observable } from 'rxjs';
import { customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @ViewChild('form') public createCustomerForm: NgForm | undefined;

  qualifications = ['Bachelor', 'Master', 'PhD'];
  hobbies = ['Reading', 'Writing', 'Traveling', 'Cricket'];
 

  constructor(private customerService: CustomerService,
               private _router:Router,
               private _route:ActivatedRoute
              )
   {

    
    }

  customers: customer[] = [];
  
  customer: customer = {
    id: 0,
    name: '',
    gender: '',
    qualification: '',
    hobbies: '',
    status: '',

  };

  hobby: any = [];
  status: string = "false";
  isupdated = false;
  isFormEdit = false;
 
  //updatecustomer=[];


  ngOnInit() { 
    this.isFormEdit = false;
    this._route.paramMap.subscribe(paramtermap=>{
     const id= Number(paramtermap.get('id'));
     this.getCustomer(id);
    });
  
  }
  

  private getCustomer(id:number){
    if(id==0){
    this.customer = {
      id: 0,
      name: '',
      gender: '',
      qualification: '',
      hobbies: '',
      status: '',
    };
  }
  else{
      this.isFormEdit=true;
      this.customerService.getCusomerById(id).subscribe(data=>{
      this.customer=Object(data);
    })
                      
  }
}



  submitForm() {
    console.log(this.customer);
    this.customerService.insertCustomer(this.customer)
      .subscribe(response =>
        console.log(response));
        this._router.navigate(['/list']);


  }

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



  editCustomer(editCustomer: customer) {
    this.isFormEdit = true;   
    this.customer.id = editCustomer.id
    this.customer = editCustomer;
    console.log(editCustomer.id);
  


  }


  submitEdit(formData: customer) {
    console.log(formData);
    formData.id = this.customer.id;
    this.customerService.updateCustomer(formData)
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
        this.customers = data;
      });

    this.isFormEdit = false;
    this._router.navigate(['/list']); 

  }


  
}
