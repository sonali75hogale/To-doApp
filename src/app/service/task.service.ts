import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../modal/todo';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string;
  serviceurl: any;

  constructor(private http: HttpClient) {
  
    this.url='http://localhost:3000/task';
  }

  addtask(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.url, todo)
  }
  getAlltask(): Observable<Todo> {
    return this.http.get<Todo>(this.url);
  }
  deletetask(id: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.url}/${id}`);
  }
  // getByid(id: number): Observable<Todo> {
  //   return this.http.get<Todo>(`${this.url}/${id}`);

  // }
  getByid(id:number){
return this.http.get(`${this.url}/${id}`);
  }

  updateTask(id:number,newdata:any){
    return this.http.put(`${this.url}/${id}`,newdata)
  }


}
