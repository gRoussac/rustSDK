import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService, InputField } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit, AfterViewInit {

  @Input() inputField!: InputField;
  @Input() parentForm!: FormGroup;
  @Output() update_deploy_json: EventEmitter<string> = new EventEmitter<string>();
  @Output() update_transaction_json: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('template', { static: true }) template!: TemplateRef<never>;

  currentPlaceholder!: string;
  private originalPlaceholder!: string;
  private readonly jsonPattern = /\[\{.*?\}\]/g;

  constructor(
    private readonly formService: FormService,
  ) { }

  ngOnInit() {
    this.originalPlaceholder = this.inputField.placeholder || '';
  }

  ngAfterViewInit() {
    this.initializePlaceholder();
  }

  isInvalid(controlName: string): boolean {
    const control = this.parentForm?.get(controlName);
    return !!this.parentForm?.touched && !!control?.invalid;
  }

  onChange($event: Event, inputField: InputField) {
    const elt = $event.target as HTMLInputElement;
    if (elt.name.includes('deploy')) {
      this.update_deploy_json.emit(elt.value);
    } else if (elt.name.includes('transaction')) {
      this.update_transaction_json.emit(elt.value);
    } else {
      this.updateForm(inputField);
    }
  }

  onFocus($event: Event) {
    const elt = $event.target as HTMLTextAreaElement;
    this.currentPlaceholder = this.removeJsonParts(elt.placeholder);
  }

  onBlur($event: Event) {
    const elt = $event.target as HTMLTextAreaElement;
    if (!elt.value) {
      this.currentPlaceholder = this.originalPlaceholder;
    }
  }

  updateForm(inputField: InputField) {
    const control = this.parentForm?.get(inputField.controlName);
    const fieldName = control && inputField.disabled_when?.find(field => field.includes('value'));
    fieldName && this.formService.updateForm();
  }

  private removeJsonParts(input: string) {
    const result = input.replace(this.jsonPattern, '').trim();
    return result;
  }

  private initializePlaceholder() {
    const control = this.parentForm.get(this.inputField.controlName);
    if (control && control.value) {
      this.currentPlaceholder = this.removeJsonParts(this.originalPlaceholder);
    } else {
      this.currentPlaceholder = this.originalPlaceholder;
    }
  }

}
