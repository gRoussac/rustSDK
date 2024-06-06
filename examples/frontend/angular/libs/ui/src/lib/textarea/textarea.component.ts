import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputField } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {

  @Input() inputField!: InputField;
  @Input() parentForm!: FormGroup;
  @Output() update_deploy_json: EventEmitter<string> = new EventEmitter<string>();
  @Output() update_transaction_json: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('template', { static: true }) template!: TemplateRef<never>;

  isInvalid(controlName: string): boolean {
    const control = this.parentForm?.get(controlName);
    return !!this.parentForm?.touched && !!control?.invalid;
  }

  updateState($event: Event) {
    const name_elt = ($event.target as HTMLInputElement).value;
    const json = ($event.target as HTMLInputElement).value;
    if (name_elt.includes('deploy')) {
      this.update_deploy_json.emit(json);
    } else if (name_elt.includes('transaction')) {
      this.update_transaction_json.emit(json);
    }
  }

}
