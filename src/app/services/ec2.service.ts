import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ITask } from '../tasks/iTask';
import { environment } from '../../environments/environment';

// we can now access environment.apiUrl
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class Ec2Service {

  // url = 'http://ec2-3-17-207-172.us-east-2.compute.amazonaws.com:8080/todos';

  constructor(private hClient: HttpClient) { }

  getTodos(): Observable<ITask[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-control-Allow-Origin': '*'
      })
    };
    return this.hClient.get<ITask[]>(API_URL, httpHead);
  }

  getTodo(id): Observable<ITask> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-control-Allow-Origin': '*'
      })
    };
    return this.hClient.get<ITask>(`${API_URL}/${id}`, httpHead);
  }

  postTodo(todoForm): Observable<ITask[]> {

    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-control-Allow-Origin': '*'
      })
    };
    return this.hClient.post<ITask[]>(API_URL, todoForm, httpHead);

  }

  putTodo(todoForm): Observable<ITask[]> {

    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-control-Allow-Origin': '*'
      })
    };
    return this.hClient.put<ITask[]>(API_URL, todoForm, httpHead);

  }

  deleteToDo(id): Observable<ITask> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-control-Allow-Origin': '*'
      })
    };
    return this.hClient.delete<ITask>(API_URL + '/' + id, httpHead);
  }

}
