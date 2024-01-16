import { Component } from '@angular/core';

import { OnExit } from 'src/app/guards/exit.guard';
// ¿Cómo se comunica exit.guard con register.component?

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  onExit(){
    const rta = confirm('Logica desde comp, ¿estás seguro de salir?');
    return rta;
  }

}
