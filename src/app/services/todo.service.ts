import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly todoApi = 'http://localhost:8080/todos/';


  constructor(private httpClient: HttpClient) {}

  createTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.todoApi + 'save', todo);
  }

  getTodo():Observable<Todo[]>{
    return this.httpClient.get<any>(this.todoApi + 'list');
  }

  deleteTodo(id: number): Observable<Todo> {
    const deleteURL = `${this.todoApi + 'delete'}/${id}`
    return this.httpClient.delete<Todo>(deleteURL)
  }

  updateTodo(todo:Todo){
    const updateURL = `${this.todoApi + 'put'}/${todo.id}` // Récupération de l'id de l'URL
    return this.httpClient.put(updateURL, todo) // Récupération de l'objet todo du @RequestBody
  }
 
}
