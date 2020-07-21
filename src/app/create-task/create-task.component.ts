import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ec2Service } from '../services/ec2.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  todos = new FormGroup({
    title: new FormControl('')
    });

  constructor(private ec2Serve: Ec2Service, private router: Router) { }

  createTask(todoSub: FormGroup): void{
    const form = JSON.stringify(todoSub.value);
    this.ec2Serve.postTodo(form).subscribe(
      response => {
          console.log(response);
      }
      );
    this.router.navigate(['tasks']);
  }

  ngOnInit(): void {
  }

}
