import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, StateService } from '@util/state';
import formFields from './form';
import { BehaviorSubject } from 'rxjs';
import { CONFIG, EnvironmentConfig } from '@util/config';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  form!: FormGroup;

  private state!: State;
  private readonly formStateSubject = new BehaviorSubject<FormGroup>(this.form);

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly formBuilder: FormBuilder,
    private readonly stateService: StateService,
  ) {
    this.stateService.getState().subscribe((state: State) => {
      if (!state.action || this.state?.action === state?.action) {
        return;
      }
      else if (state.action) {
        state && (this.state = state);
        this.initializeForm();
      }
    });
    this.form = this.defaultForm;
  }

  private get defaultForm() {
    const formControlsConfig: { [key: string]: FormControl; } = {};
    formFields.forEach((fields) => {
      fields.forEach((row) => {
        row.forEach((field) => {
          const name = field.input?.controlName || field.textarea?.controlName || '';
          name && (formControlsConfig[name] = new FormControl());
        });
      });
    });
    return this.formBuilder.group(formControlsConfig);
  }

  private initializeForm() {
    const fields = this.state.action && formFields.get(this.state.action);
    if (fields) {
      Object.values(this.form.controls).forEach(control => {
        control.disable();
        control.clearValidators();
      });
      fields.forEach((row) => {
        row.forEach((field) => {
          if (!field.input && !field.textarea) {
            return;
          }
          const name = field.input?.controlName || field.textarea?.controlName || '';
          const control = this.form.get(name);

          if (control) {
            if (field.required) {
              control.setValidators([Validators.required]);
            } else {
              control.clearValidators();
            }

            const state = field.input?.state_name || field.textarea?.state_name || [];
            const stateName = state && state.find(name => this.state[name as keyof State]);
            const defaultValue = stateName ? this.state[stateName as keyof State] : '';

            if (defaultValue) {
              defaultValue && control.setValue(defaultValue);
            } else if (field.input?.config_name) {
              const defaultValue = this.config[field.input?.config_name as string] || '';
              defaultValue && control.setValue(defaultValue);
              defaultValue && (field.input.placeholder_config_value = defaultValue as string);
            }
            control.enable();

            if (this.state.has_wasm && field.input?.disabled_when?.includes('has_wasm')) {
              control.disable();
            }
          }
        });
      });
      this.form.updateValueAndValidity();
    }
  }


  setValue(controlName: string, value: string) {
    const control = this.form.get(controlName);
    if (control) {
      control.setValue(value.trim());
    }
  }

  getValue(controlName: string): string | undefined {
    const control = this.form.get(controlName);
    return control ? control.value : undefined;
  }

  get formFields() {
    return formFields;
  }

  get formState() {
    return this.formStateSubject.asObservable();
  }

  updateFormState(newState: FormGroup) {
    this.formStateSubject.next(newState);
  }
}
