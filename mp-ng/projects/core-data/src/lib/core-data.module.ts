import { UsersService } from './users.service';
import {CommonModule} from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsersService
  ]
})
export class CoreDataModule { }