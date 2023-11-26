import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputField } from '@util/form';
import { motesToCSPR } from 'casper-sdk';
import { State, StateService } from '@util/state';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputComponent implements AfterViewInit, OnDestroy {

  @Input() inputField!: InputField;
  @Input() parentForm!: FormGroup;

  has_wasm!: boolean;

  private stateSubscription!: Subscription;

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  constructor(
    private readonly stateService: StateService,
  ) { }

  async ngAfterViewInit() {
    this.setStateSubscription();
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      this.has_wasm = !!state.has_wasm;
      const control = this.parentForm?.get(this.inputField.controlName);
      if (this.has_wasm && this.inputField.disabled_when?.includes('has_wasm')) {
        control?.setValue('');
        control?.disable();
      } else {
        control?.enable();
      }
    });
  }

  onChange($event: Event, inputField: InputField) {
    const value = ($event.target as HTMLInputElement)?.value;
    if (inputField.disabled_when) {
      const fieldName = inputField.disabled_when.find(field => field.includes('value'));
      if (fieldName) {
        const control = this.parentForm?.get(fieldName.split('.')[0]);
        if (control && control) {
          value ? control.disable() : control.enable();
        }
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.parentForm?.get(controlName);
    return !!this.parentForm?.touched && !!control?.invalid;
  }

  motesToCSPR(amount: string) {
    if (!amount) {
      return;
    }
    amount = this.parse_commas(amount);
    return motesToCSPR(amount);
  }

  private parse_commas(amount: string) {
    return amount.replace(/[,.]/g, '');
  }
}
