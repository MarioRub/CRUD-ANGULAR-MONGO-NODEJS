import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { Tasks } from 'src/app/model/tasks';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTask()
      .subscribe(res => {
        this.tasksService.ar_task = res as Tasks[];
      });
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  postTasks(form?: NgForm) {
    
    if (form.value._id) {
      this.tasksService.putTask(form.value)
        .subscribe(res => {
          this.clean(form);
          this.getTasks();
        })
    }

    this.tasksService.postTask(form.value)
      .subscribe(res => {
        this.clean(form);
        this.getTasks();
        console.log(res);
      })
  }

  deleteTask(_id: string, form?: NgForm) {
    this.tasksService.deleteTask(_id)
      .subscribe(res => {
        this.getTasks();
      })
  }

  editTask(task: Tasks) {
    this.tasksService.stask = task;
  }


}
