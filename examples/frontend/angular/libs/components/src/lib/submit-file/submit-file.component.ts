import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '@util/error';

@Component({
  selector: 'comp-submit-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-file.component.html',
  styleUrls: ['./submit-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitFileComponent {

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
  @ViewChild('deployFileElt') deployFileElt!: ElementRef;
  @ViewChild('transactionFileElt') transactionFileElt!: ElementRef;
  @Output() select_deploy: EventEmitter<string> = new EventEmitter<string>();
  @Output() select_transaction: EventEmitter<string> = new EventEmitter<string>();
  @Input() type = 'deploy';

  private deploy_json!: string;
  private transaction_json!: string;

  constructor(
    private readonly errorService: ErrorService,
  ) { }

  async onDeployFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    let text;
    this.deploy_json = '';
    if (file) {
      text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      try {
        const deploy_json = JSON.parse(text);
        this.deploy_json = deploy_json;
      } catch {
        const error = 'Error parsing deploy';
        console.error(error);
        this.errorService.setError(error as string);
      }
    }
    this.select_deploy.emit(this.deploy_json);
    this.deployFileElt.nativeElement.value = '';
  }


  async onTransactionFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    let text;
    this.transaction_json = '';
    if (file) {
      text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      try {
        const transaction_json = JSON.parse(text);
        this.transaction_json = transaction_json;
      } catch {
        const error = 'Error parsing transaction';
        console.error(error);
        this.errorService.setError(error as string);
      }
    }
    this.select_transaction.emit(this.transaction_json);
    this.transactionFileElt.nativeElement.value = '';
  }

  deployFileClick() {
    (this.deployFileElt.nativeElement as HTMLInputElement).click();
  }

  transactionFileClick() {
    (this.transactionFileElt.nativeElement as HTMLInputElement).click();
  }

}
