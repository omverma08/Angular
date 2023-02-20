import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes } from '@angular/router'


import { AppComponent } from './app.component';
import { CustomerService } from './customer.service';
import { CreateCustomerCanDeactiveGuardService } from './customers/create-customer-can-deactive-guard.service';
import { CustomersComponent } from './customers/customers.component';
import { ListCustomerComponent } from './customers/list-customer.component';

const appRoutes:Routes=[
{ path: 'list',
component:ListCustomerComponent},
{ 
  path:'edit/:id',
  component:CustomersComponent,
  canDeactivate:[CreateCustomerCanDeactiveGuardService]
},
{ path:'',redirectTo:'/list',
pathMatch:'full'
}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ListCustomerComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule ,  
    ReactiveFormsModule ,
    RouterModule.forRoot(appRoutes)
     
   
  ],
  providers: [CustomerService,CreateCustomerCanDeactiveGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
