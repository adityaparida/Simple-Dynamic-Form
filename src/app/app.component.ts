import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userForm: FormGroup;
  userArray: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userArray: this.formBuilder.array([this.createUser()])
    });
  }

  createUser() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  
  addUser() {
    this.userArray = this.userForm.get('userArray') as FormArray;
    this.userArray.push(this.createUser());
  }

  removeUser(id: number) {
    this.userArray = this.userForm.get('userArray') as FormArray;
    this.userArray.removeAt(id);
  }

  moveUser(id: number, shift) {
    this.userArray = this.userForm.get('userArray') as FormArray;
    const user = this.userArray.at(id);
    this.userArray.removeAt(id);
    this.userArray.insert(id + shift, user);
  }

  resetForm() {
    this.userForm.reset();
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
