import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UuidServiceService {

  constructor() { }

  generateId() : string{
    return crypto.randomUUID()
  }
}
