import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, forkJoin, takeUntil } from 'rxjs';
import { IMail } from '../../../models/interfaces/mail';
import { IContent, ISimpleContent } from '../../../models/interfaces/content';
import { MailService } from '../../../models/services/mail.service';
import { ContentService } from '../../../models/services/content.service';
import { DisplayService } from '../../../models/services/display.service';
import { Converter } from '../../../models/common/converter';
import { Utilities } from '../../../models/common/utilities';

@Component({
  selector: 'app-mail-list-item',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent {
  private _unsubscribe$ = new Subject<void>();
  private _id!: number;
  public attachments: IContent[] = [];
  public selectedAttachment!: IContent;
  public mail!: IMail;
  public showPreview = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _mailService: MailService,
    private _displayService: DisplayService,
    private _contentService: ContentService) {
  }

  public ngOnInit(): void {
    this._id = +this._activatedRoute.snapshot.paramMap.get('id')!;
    this.getMail();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public goToPreviousPage(): void {
    this._router.navigate(['..']);
  }

  public changeShowPreviewState(): void {
    this.showPreview = !this.showPreview;
  }

  public getIcon(content: ISimpleContent): string {
    return Utilities.getFileIconByExtension(content.mediaSubtype);
  }

  public previewImage(id: string): string {
    let content = this.findContent(id);
    if (!content) {
      return '';
    }
    return Converter.toFileSrc(content);
  }

  public previewContent(id: string): void {
    let content = this.findContent(id);
    if (!content) {
      return;
    }
    this.showPreview = true;
    this.selectedAttachment = content;
  }

  public downloadContent(e: Event, id: string): void {
    e.stopPropagation();
    let content = this.findContent(id);
    if (content) {
      Utilities.save(content.body, content.fileName);
    }
  }

  private findContent(id: string): IContent | null {
    let content = this.attachments.find(x => x.contentId === id);
    if (content) {
      return content;
    }
    return null;
  }

  private getMail(): void {
    this._displayService.changeStateLoadBar(true);
    let changeLoaderFinalize = false;
    this._mailService.getMail(this._id).pipe(
      takeUntil(this._unsubscribe$)).subscribe({
        next: (data: IMail) => {
          this.mail = data;
          if (this.mail.isContents || this.mail.isAttachments) {
            this.getContents(this.mail.contents);
          } else {
            this._displayService.changeStateLoadBar(false);
          }
          changeLoaderFinalize = true;
        },
        error: () => {
          this._displayService.changeStateLoadBar(false);
          changeLoaderFinalize = true;
        },
        complete: () => {
          if (changeLoaderFinalize) {
            return;
          }
          this._displayService.changeStateLoadBar(false);
        }
      });
  }

  private getContents(contents: ISimpleContent[]): void {
    const observables = [];
    for (const content of contents) {
      const observable = this._contentService.getContent(content.contentId);
      observables.push(observable);
    }
    forkJoin(observables).pipe(
      takeUntil(this._unsubscribe$),
      finalize(() => {
        this._displayService.changeStateLoadBar(false);
      })).subscribe((data: IContent[]) => {
        this.handleLoadedContent(data);
      });
  }

  private handleLoadedContent(contents: IContent[]): void {
    for (const content of contents) {
      if (content.isAttachment) {
        this.attachments.push(content);
      }
      this.mail.html = this.mail.html.replace(`cid:${content.contentId}`, Converter.toFileSrc(content));
    }
  }
}