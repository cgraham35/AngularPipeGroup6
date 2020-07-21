import { Component, OnInit } from '@angular/core';
import { Ec2Service } from '../services/ec2.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../tasks/iTask';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  pageTitle = '';
  currentTaskID = '0';
  currentTask: ITask;

  putError = false;
  errorMsg = ' ';

  todos: FormGroup;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ec2Serve: Ec2Service, private router: Router) {}

  getTask(): ITask{
    this.ec2Serve.getTodo(this.currentTaskID)
    .subscribe({
      next: (response: ITask) => { this.displayTask(response);
                                   console.log(response);
                                   this.currentTask = response;
      },
      error: err => this.errorMsg = err
    });
    return this.currentTask;
  }

  displayTask(task: ITask): void{
    if (this.todos){
      this.todos.reset();
    }
    this.currentTask = task;

    if (this.currentTask.id === 0 ){
      this.pageTitle = 'Add Task';
    } else {
      this.pageTitle = `Edit Task: ${this.currentTaskID}!`;
    }

    this.todos.patchValue({
      id: this.currentTaskID,
      title: this.currentTask.title,
      createdOn: this.currentTask.createdOn,
      completed: this.currentTask.completed
    });
  }

  onHttpError(errorResponse: any): void{
    console.log('error', errorResponse);
    this.putError = true;
    this.errorMsg = errorResponse.error.error;
  }

  updateTask(todoSub: FormGroup): void{
    const form = JSON.stringify(todoSub.value);
    this.ec2Serve.putTodo(form)
      .subscribe(
        response => console.log('success', response),
        error => this.onHttpError(error)
      );
    this.router.navigate(['tasks']);
  }

  ngOnInit(): void {
    this.currentTaskID = this.route.snapshot.paramMap.get('id');

    this.todos = this.fb.group ({
      id: 0,
      title: '',
      createdOn: '',
      completed: false
    });

    this.currentTask = this.getTask();
  }

}


