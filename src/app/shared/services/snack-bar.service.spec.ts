import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [
        SnackBarService,
        { provide: MatSnackBar, useValue: matSnackBar }
      ]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with the message and action', () => {
    service.show('Todo added');

    expect(matSnackBar.open).toHaveBeenCalledWith('Todo added', 'Close', {
      horizontalPosition: 'left'
    });
  });
});
