import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { studentsArray } from '../../const/students';
import { Student } from '../../model/student';
import { UuidServiceService } from '../../services/uuid-service.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { stderr } from 'process';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.scss']
})
export class StudentCrudComponent implements OnInit {

  constructor(
    private _uuid: UuidServiceService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  isInEditMode: boolean = false;

  @ViewChild('fname') firstName !: ElementRef<HTMLInputElement>
  @ViewChild('lname') lastName !: ElementRef<HTMLInputElement>
  @ViewChild('email') email !: ElementRef<HTMLInputElement>
  @ViewChild('contact') contact !: ElementRef<HTMLInputElement>
  @ViewChild('isActive') isActive !: ElementRef<HTMLInputElement>
  private updateId !: string;
  studentsArray = studentsArray;

  onStudentAdd(): void {
    const newStudent: Student = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      isActive: this.isActive.nativeElement.value === "yes",
      id: this._uuid.generateId()

    }

    console.log(newStudent);

    studentsArray.unshift(newStudent);
    this.firstName.nativeElement.value = ''
    this.lastName.nativeElement.value = ''
    this.email.nativeElement.value = ''
    this.contact.nativeElement.value = ''
    this.isActive.nativeElement.value = "yes"
    this._snackBar.successMessage(`Student with id : ${newStudent.id} is added successfully!!!`);
  }

  onDelete(id: string) {
    const getConfirm = confirm(`Are you sure you want to delete student with id : ${id}`);
    if (!getConfirm) {
      return this._snackBar.errorMessage(`Delete process terminated !!!`);
    }
    const deleteItem = this.studentsArray.findIndex(std => std.id === id);
    studentsArray.splice(deleteItem, 1);
    this._snackBar.successMessage(`Student with id : ${deleteItem} is deleted successfully...`);
  }

  onEdit(student: Student): void {
    this.isInEditMode = true;
    this.updateId = student.id;
    this.firstName.nativeElement.value = student.firstName;
    this.lastName.nativeElement.value = student.lastName;
    this.email.nativeElement.value = student.email;
    this.contact.nativeElement.value = student.contact;
    this.isActive.nativeElement.value = student.isActive ? 'yes' : 'no'
  }

  onUpdate(): void {
    const updatedObject: Student = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      isActive: this.isActive.nativeElement.value === "yes",
      id: this.updateId
    }

    const updateIndex = studentsArray.findIndex(s => s.id === this.updateId);
    studentsArray[updateIndex] = updatedObject;
    console.log(studentsArray);
    
    this.firstName.nativeElement.value = ''
    this.lastName.nativeElement.value = ''
    this.email.nativeElement.value = ''
    this.contact.nativeElement.value = ''
    this.isActive.nativeElement.value = "yes"

    this._snackBar.successMessage(`Student with id ${this.updateId} is updated successfully...`);
    this.isInEditMode = false
  }
}
