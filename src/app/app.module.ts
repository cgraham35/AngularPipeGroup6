import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {Ec2Service} from './services/ec2.service';

import { AppComponent } from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'tasks', component: TasksComponent },
      {path: 'create', component: CreateTaskComponent},
      {path: 'update/:id', component: UpdateTaskComponent},
      {path: '**', redirectTo: 'tasks'}
    ])
  ],
  providers: [Ec2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }

