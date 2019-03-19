import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../projects/material/src/lib/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
