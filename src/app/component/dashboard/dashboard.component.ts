import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/modal/todo';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj: Todo = new Todo();
  taskform: any;


  taskArr: any;
  addtaskData: string = '';
  isEditMode: boolean = false;
  rowSelected: any = {};
  modaledit = false



  constructor(private api: TaskService, private router: ActivatedRoute) {
    const aboutname = this.router.snapshot.params['id']
    console.log(aboutname)
    // if (aboutname) {

    // this.isEditMode = true;
    this.api.getByid(aboutname).subscribe(data => {
      console.log(data)
      this.taskform.patchValue(data);

    })
    // }

  }

  ngOnInit(): void {

    this.taskform = new FormGroup({
      id: new FormControl(''),
      task: new FormControl(''),


    })

    // this.taskObj = new Todo();
    this.gettask();
    // this.taskArr = [];
  }

  adddata() {
    // this.taskObj.task = this.addtaskData;
    console.log(this.taskform.value)
    this.api.addtask(this.taskform.value).subscribe(res => {
      console.log(res);
      // this.ngOnInit();
      this.gettask();
      // this.taskArr=res;
      // this.addtaskData;

    })
  }

  gettask() {
    this.api.getAlltask().subscribe(res => {
      console.log(res)
      this.taskArr = res;
      // this.adddata();
    })

  }

  editdata(id: any) {
   this.modaledit=false;
   this.api.updateTask(id,this.rowSelected).subscribe(data=>{
     console.log(data);
   })
    // let param2 = {
    //   "task": this.taskform.value.task
    // }
    // this.api.updateTask(this.taskform.controls.id.value, param2).subscribe(data => {
    //   console.log(data)
    // })
  }


  // delete task after complete
  deletedata(data: any) {
    this.api.deletetask(data).subscribe(res => {
      this.ngOnInit();
      console.log(res);

    })

  }
  gotoedit(row: any) {
    this.rowSelected = row;
    console.log(row);
    this.modaledit = true;
  }

}
