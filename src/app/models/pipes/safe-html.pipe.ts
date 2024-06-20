import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }
  
  transform(value: string): SafeResourceUrl | undefined {
    if (!value) {
      return undefined;
    }
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}