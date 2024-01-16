import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { BasicFormComponent } from './pages/basic-form/basic-form.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    BasicFormComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
