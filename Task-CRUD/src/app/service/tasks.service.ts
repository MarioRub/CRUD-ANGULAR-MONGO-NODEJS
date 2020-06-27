import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Tasks } from '../model/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  stask: Tasks;
  ar_task: Tasks[];
  readonly URL_API = "http://localhost:3000/";
  constructor(public http: HttpClient) {
    this.stask = new Tasks();
  }

  getTask() {
    return this.http.get(this.URL_API);
  }

  postTask(task: Tasks) {
    return this.http.post(this.URL_API, task);
  }

  putTask(task: Tasks) {
    return this.http.put(this.URL_API + `${task._id}`, task);
  }

  deleteTask(_id: string) {
    return this.http.delete(this.URL_API + `${_id}`)
  }
}
