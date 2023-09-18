import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from './result.service';
import { Result } from './result';
import { Subscription } from 'rxjs';
import { UtilHihlightWebworkerModule } from '@util/hightlight-webworker';
import { jsonPrettyPrint } from 'casper-sdk';

@Component({
  selector: 'comp-result',
  standalone: true,
  imports: [CommonModule, UtilHihlightWebworkerModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements AfterViewInit, OnDestroy {
  title!: string;
  result!: string;
  resultHtml!: string;

  @ViewChild('resultElt') resultElt!: ElementRef;
  @ViewChild('codeElt', { read: ElementRef }) contentChildren!: ElementRef;

  private getResultSubscription!: Subscription;

  constructor(
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.getResultSubscription = this.resultService.getResult().subscribe((res: Result) => {
      this.result = res.result;
      this.resultHtml = res.resultHtml;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.getResultSubscription && this.getResultSubscription.unsubscribe();
  }

  copy(value: string): void {
    this.resultService.copyClipboard(jsonPrettyPrint(JSON.parse(value), 1));
  }

  reset() {
    this.result = '';
    this.resultHtml = '';
    this.resultService.setResult('');
  }
}
