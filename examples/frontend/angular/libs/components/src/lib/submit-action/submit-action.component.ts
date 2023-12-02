import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';

@Component({
  selector: 'comp-submit-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-action.component.html',
  styleUrls: ['./submit-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitActionComponent implements AfterViewInit, OnDestroy {

  action!: string;
  @Input() class!: string;
  @Input() e2e!: string;

  @Output() submit_action: EventEmitter<string> = new EventEmitter<string>();

  private stateSubscription!: Subscription;

  constructor(
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngAfterViewInit(): Promise<void> {
    this.setStateSubscription();
  };

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }

  submitAction(action: string) {
    this.submit_action.emit(action);
  }
}
