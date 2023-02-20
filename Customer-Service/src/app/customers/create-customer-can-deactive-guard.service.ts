import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { CustomersComponent } from "./customers.component";

@Injectable()
export class CreateCustomerCanDeactiveGuardService implements CanDeactivate<CustomersComponent>{

    canDeactivate(component: CustomersComponent): boolean {
      if(component.createCustomerForm?.dirty){
        return confirm("Are you sure want to discard your changes");
      }

      return true;
    }
    
}