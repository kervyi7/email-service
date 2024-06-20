import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewContainerFactory } from './view-container.factory';
import { ViewContainerBase } from './view-container-base';
import { DisplayService } from '../../../models/services/display.service';
import { Converter } from '../../../models/common/converter';
import { Utilities } from '../../../models/common/utilities';
import { IContent } from '../../../models/interfaces/content';
import { FileExtension } from '../../../models/enums/file-extension';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  @Input() attachments: IContent[] = [];
  @Input() selectedAttachment!: IContent;
  @Output() onClose = new EventEmitter();

  private _fileSrc!: string;
  private _selectedAttachmentIndex!: number;
  public viewContainer!: ViewContainerBase;
  public isFileCanPreview = false;

  get fileSrc(): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(this._fileSrc);
  }

  get imageSrc(): string {
    return Converter.toFileSrc(this.selectedAttachment);
  }

  get viewContainerStyle(): Record<string, any> {
    return {
      height: this.viewContainer.height,
      width: this.viewContainer.width,
      backgroundColor: this.viewContainer.backgroundColor,
      maxHeight: this.viewContainer.maxHeight,
      maxWidth: this.viewContainer.maxWidth,
      marginTop: this.viewContainer.marginTop
    };
  }

  constructor(
    private _domSanitizer: DomSanitizer,
    private _displayService: DisplayService) { }

  public ngOnInit(): void {
    this._displayService.changeStateLoadBar(true);
    this._selectedAttachmentIndex = this.attachments.indexOf(this.selectedAttachment);
    this.preview(this.selectedAttachment);
  }

  public close(): void {
    this.onClose.emit();
  }

  public save(): void {
    Utilities.save(this.selectedAttachment.body, this.selectedAttachment.fileName);
  }

  public showFile(): boolean {
    return this.isFileCanPreview;
  }

  public isDocument(): boolean {
    return this.selectedAttachment.mediaSubtype.toLowerCase() === FileExtension.PDF || this.selectedAttachment.mediaSubtype.toLowerCase() === FileExtension.TXT;
  }

  public isFirstFile(): boolean {
    return this._selectedAttachmentIndex == 0;
  }

  public isLastFile(): boolean {
    return this._selectedAttachmentIndex == (this.attachments.length - 1);
  }

  public goToNextFile(): void {
    this._selectedAttachmentIndex += 1;
    this.selectedAttachment = this.attachments[this._selectedAttachmentIndex];
    this.preview(this.selectedAttachment);
  }

  public goToPreviousFile(): void {
    this._selectedAttachmentIndex -= 1;
    this.selectedAttachment = this.attachments[this._selectedAttachmentIndex];
    this.preview(this.selectedAttachment);
  }

  public showMsgCantPreview(): boolean {
    return !this.isFileCanPreview;
  }

  private preview(content: IContent): void {
    if (content) {
      this.viewContainer = ViewContainerFactory.create(content.mediaSubtype)!;
      const typedFile = Converter.base64ToFile(content.body, content.fileName, { type: this.viewContainer.type });
      this._fileSrc = window.URL.createObjectURL(typedFile);
      this.isFileCanPreview = true;
    } else {
      this.isFileCanPreview = false;
    }
    this._displayService.changeStateLoadBar(false);
  }
}
