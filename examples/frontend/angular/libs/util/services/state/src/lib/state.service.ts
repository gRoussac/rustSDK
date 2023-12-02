import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private readonly state = new BehaviorSubject<State>({} as State);

  setState(newState: State) {
    const currentState = this.state.getValue();
    const mergedState = { ...currentState, ...newState };
    this.state.next(mergedState);
  }

  getState() {
    return this.state.asObservable();
  }

  getValue() {
    return this.state.getValue();
  }
}
