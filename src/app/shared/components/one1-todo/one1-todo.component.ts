import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { todoArray } from '../../const/todoData';
import { Todo } from '../../model/todo';
import { UuidServiceService } from '../../services/uuid-service.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-one1-todo',
  templateUrl: './one1-todo.component.html',
  styleUrls: ['./one1-todo.component.scss']
})
export class One1TodoComponent implements OnInit {

  constructor(
    private uuid: UuidServiceService,
    private snackBar: SnackBarService

  ) { }

  ngOnInit(): void {
  }

  @ViewChild("todoItemRef")
  todoItemRef!: ElementRef<HTMLInputElement>
  @ViewChild("isCompleted")
  todoIsCompleted !: ElementRef<HTMLSelectElement>



  trackByTodoId(index: number, todo: Todo): string {
    return todo.todoId
  }
  todoArr = todoArray;
  isInEditMode: boolean = false

  onTodoAdd(): void {
    if (!this.todoItemRef.nativeElement.value) {
      return this.snackBar.errorMessage(`Todo item is required!!!`)
    }
    const newTodo: Todo = {
      todoItem: this.todoItemRef.nativeElement.value,
      isCompleted: this.todoIsCompleted.nativeElement.value === "yes",
      todoId: this.uuid.generateId()
    }
    todoArray.unshift(newTodo);
    this.snackBar.successMessage(`Todo item with id ${newTodo.todoId} is added successfully!!!`);
    this.todoItemRef.nativeElement.value = '';
    this.todoIsCompleted.nativeElement.value = 'no';

  }

  //delete
  onDelete(todoId: string): void {
    const getConfirm = confirm(`Are you sure you want to delete todo with id ${todoId}`);
    if (getConfirm) {
      const deleteIndex = todoArray.findIndex(todo => todoId === todo.todoId);
      todoArray.splice(deleteIndex, 1);
      this.snackBar.successMessage(`Todo with id ${todoId} is deleted successfully...`);
    } else {
      this.snackBar.errorMessage(`Delete Process terminated!!!`);
    }
  }

  private updateId!: string;
  //edit
  onEdit(todo: Todo): void {
    this.isInEditMode = true;
    this.updateId = todo.todoId;
    this.todoItemRef.nativeElement.value = todo.todoItem;
    this.todoIsCompleted.nativeElement.value = todo.isCompleted ? 'yes' : 'no';
  }

  //update
  onUpdate(): void {
    const updatedObj: Todo = {
      todoItem: this.todoItemRef.nativeElement.value,
      isCompleted: this.todoIsCompleted.nativeElement.value === "yes" ? true : false,
      todoId: this.updateId
    }

    const udpateIndex = todoArray.findIndex(todo => todo.todoId === this.updateId);
    todoArray[udpateIndex] = updatedObj;
    this.snackBar.successMessage(`Todo with id : ${this.updateId} is updated successfully...`);
    this.isInEditMode = false;
    this.todoItemRef.nativeElement.value = '';
    this.todoIsCompleted.nativeElement.value = 'no';
  }

  //checkbox update
  onIscompleteUpdate(todo : Todo) : void{
    todo.isCompleted = !todo.isCompleted;
    let getIdx = this.todoArr.findIndex(e => e.todoId === todo.todoId);
    this.todoArr[getIdx] = todo
    console.log(this.todoArr);
  }
  
}
