import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class GlobalService {
  public user = new BehaviorSubject(null);
  public admin = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
}
