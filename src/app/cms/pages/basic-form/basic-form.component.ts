import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent {

  nameField = new FormControl();
  emailField = new FormControl();
  phoneField = new FormControl();
  dateField = new FormControl();
  colorField = new FormControl();
  categoryField = new FormControl();

  agreeField = new FormControl(false); 
  genderField = new FormControl();
  preferField1 = new FormControl();
  preferField2 = new FormControl();
  preferField3 = new FormControl();

  getNameValue(){
    console.log(this.nameField.value)
  }
}
