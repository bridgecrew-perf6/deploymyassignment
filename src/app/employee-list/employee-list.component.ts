import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeList } from './employee-list.model';
import { ApiService } from '../shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  formValue !: FormGroup;

  employeeListObj : EmployeeList = new EmployeeList();
  employeeData !: any;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) {}
    ngOnInit(){
      this.formValue = this.formbuilder.group({
        Id:[''],
        Name:[''],
        Age:[''],
        Email:[''],
        Phonenumber:['']

      })
      this.getAllEmployee();
    }

  

  postEmployeeDetails(){
    this.employeeListObj.id = this.formValue.value.Id;
    this.employeeListObj.name = this.formValue.value.Name;
    this.employeeListObj.age = this.formValue.value.Age;
    this.employeeListObj.email = this.formValue.value.Email;
    this.employeeListObj.phonenumber = this.formValue.value.Phonenumber;
    
    this.api.postEmployee(this.employeeListObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Sucessfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      
      
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong");
    }
    )
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(employee:any){
    this.api.deleteEmployee(employee.id)
    .subscribe(res=>{
      alert("Employee Deleted Sucessfully")  
      this.getAllEmployee();
    })
  }
  onEdit(employee: any){
    this.employeeListObj.id = employee.id;
    this.formValue.controls['Name'].setValue(employee.name);
    this.formValue.controls['Age'].setValue(employee.age);
    this.formValue.controls['Email'].setValue(employee.email);
    this.formValue.controls['Phonenumber'].setValue(employee.phonenumber); 
  }

  updateEmployeeDetails(){
    this.employeeListObj.name = this.formValue.value.Name;
    this.employeeListObj.age = this.formValue.value.Age;
    this.employeeListObj.email = this.formValue.value.Email;
    this.employeeListObj.phonenumber = this.formValue.value.Phonenumber;
    this.api.updateEmployee(this.employeeListObj,this.employeeListObj.id)
     .subscribe(res=> {
       alert("updated successfully");
       let ref = document.getElementById('cancel')
       ref?.click();
       
       
       this.formValue.reset();
       this.getAllEmployee();
     })   
  }

}
