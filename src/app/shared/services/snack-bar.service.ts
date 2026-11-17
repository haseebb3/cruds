import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar : MatSnackBar) { }

  successMessage(msg : string) : void {
    this._snackBar.open(msg,'Close',{
      duration : 3000,
      horizontalPosition : 'left',
      verticalPosition : 'top'
    })
  }

  errorMessage(msg:string) : void{
    this._snackBar.open(msg, "Dismiss", {
      duration : 3000,
      horizontalPosition : 'left',
      verticalPosition : 'top'
    })
  }
}
