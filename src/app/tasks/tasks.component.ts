import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ITask} from './iTask';
import {Ec2Service} from '../services/ec2.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  pageTitle = 'ALL TASKS DATA';

  allTasks: ITask[];
  filteredTasks: ITask[] = [];

  selectedFilter = 'title';
  attrListFilter = '';

  @Output()
  delete: EventEmitter<Observable<ITask>> = new EventEmitter();

  constructor(private ec2Serve: Ec2Service) {}

  // event handler for the select element's change event
  selectChange(event: any): void {
    this.selectedFilter = event.target.value;
  }

  // Filter tasks

  get listFilter(): string {
      return this.attrListFilter;
  }

  set listFilter(s: string) {
      this.attrListFilter = s;
      this.filteredTasks = this.attrListFilter ? this.performFilter(this.attrListFilter) : this.allTasks;
  }

  performFilter(filterBy: string): ITask[]{
    if (this.selectedFilter === 'title') {
      filterBy = filterBy.toLocaleLowerCase();
      return this.allTasks.filter((task: ITask) => task.title.toLocaleLowerCase().indexOf(filterBy) !== -1 );
    } else {
      return this.allTasks.filter((task: ITask) => task.id === Number(filterBy));
    }
}


  getTasks(): void{
    this.ec2Serve.getTodos()
    .subscribe(
      response => {
        console.log(response);
        this.allTasks = response;
        this.filteredTasks = response;
      });
  }

  deleteTask(Id): void {
    console.log(Id);
    this.ec2Serve.getTodo(Id).subscribe(
      response => {
        console.log(response);
        if (confirm('Are you sure you want to delete Task: ' + response.title)) {
          this.ec2Serve.deleteToDo(Id).subscribe(
            response2 => {
              console.log(response2);
              this.ngOnInit();
            }
          );
        }
      }
    );
  }


  ngOnInit(): void {
    this.getTasks();
  }

}
