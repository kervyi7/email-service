import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { IMail } from 'src/app/models/interfaces/mail';
import { IContent, ISimpleContent } from '../../../models/interfaces/content';
import { MailService } from '../../../models/services/mail.service';
import { DisplayService } from '../../../models/services/display.service';
import { ContentService } from '../../../models/services/content.service';
import { Utilities } from '../../../models/common/utilities';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {
  private _searchBy: string = '';
  private _unsubscribe$ = new Subject<void>();
  public readonly countOptions = [20, 30, 40, 50, 80, 100, 150];
  public mails: IMail[] = [];
  public mailPerPageCount = 20;
  public mailsCount = 0;
  public currentPage = 1;
  public lastPage = 1;
  public searchedInputValue = '';
  public isMenuOpen = false;
  public popupState = false;
  public selectedContentId!: string;

  constructor(private _router: Router,
    private _mailService: MailService,
    private _displayService: DisplayService,
    private _contentService: ContentService) {
  }

  public ngOnInit(): void {
    this._displayService.changeStateLoadBar(true);
    let page = Utilities.getDataFromStorage('page');
    let count = Utilities.getDataFromStorage('count');
    if (page) {
      this.currentPage = +page;
    }
    if (count) {
      this.mailPerPageCount = +count;
    }
    this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
    this.getMailsCount();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public navigateToMail(id: number): void {
    this._router.navigate(['main/mail', id]);
  }

  public searchMails(): void {
    this.currentPage = 1;
    if (this._searchBy == this.searchedInputValue) {
      return;
    }
    this._searchBy = this.searchedInputValue;
    this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy)
  }

  public previousPage(): void {
    if (this.currentPage != 1) {
      this.currentPage -= 1;
      this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
      Utilities.saveDataInStorage('page', this.currentPage.toString());
    }
  }

  public nextPage(): void {
    if (this.currentPage != this.lastPage) {
      this.currentPage += 1;
      this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
      Utilities.saveDataInStorage('page', this.currentPage.toString());
    }
  }

  public isFirstPage(): boolean {
    return this.currentPage == 1;
  }

  public isLastPage(): boolean {
    return this.currentPage == this.lastPage;
  }

  public goToFirstPage(): void {
    if (this.currentPage == 1) {
      return;
    }
    this.currentPage = 1;
    this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
    Utilities.saveDataInStorage('page', this.currentPage.toString());
  }

  public goToLastPage(): void {
    if (this.currentPage == this.lastPage) {
      return;
    }
    this.currentPage = this.lastPage;
    this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
    Utilities.saveDataInStorage('page', this.currentPage.toString());
  }

  public changeMailsCount(count: number): void {
    if (count != this.mailPerPageCount) {
      this.mailPerPageCount = count;
      this.getPagesCount();
      this.goToFirstPage();
      this.getMails(this.currentPage, this.mailPerPageCount, this._searchBy);
      Utilities.saveDataInStorage('count', this.mailPerPageCount.toString());
    }
    this.isMenuOpen = false;
  }

  public openCountMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public showPopup(itemId: string): void {
    this.popupState = !this.popupState;
    this.selectedContentId = itemId;
  }

  public changePopupState(id: string): boolean {
    return this.popupState && id == this.selectedContentId;
  }

  public getIcon(content: ISimpleContent): string {
    return Utilities.getFileIconByExtension(content.mediaSubtype);
  }

  public downloadContent(e: Event, id: string): void {
    e.stopPropagation();
    this.getContent(id);
  }

  private prepareMail(): void {
    this.mails.forEach(mail => {
      if (mail.text) {
        mail.text = mail.text.replace(/(\r\n)|(\n)|(\r)|(\t)|(\f)|(=)/g, " ");
      }
      if (!mail.subject) {
        mail.subject = "No subject";
      }
    });
  }

  private getMails(page: number, count: number, search: string): void {
    this._displayService.changeStateLoadBar(true);
    this._mailService.getMails(page, count, search).pipe(
      takeUntil(this._unsubscribe$),
      finalize(() => {
        this._displayService.changeStateLoadBar(false);
      }))
      .subscribe((data: IMail[]) => {
        this.mails = data;
        this.prepareMail();
      });
  }

  private getMailsCount(): void {
    this._mailService.getCount().subscribe((data: number) => {
      this.mailsCount = data;
      this.getPagesCount();
    });
  }

  private getPagesCount(): void {
    this.lastPage = Math.ceil(this.mailsCount / this.mailPerPageCount);
  }

  private getContent(id: string): void {
    this._displayService.changeStateLoadBar(true);
    this._contentService.getContent(id).pipe(
      takeUntil(this._unsubscribe$),
      finalize(() => {
        this._displayService.changeStateLoadBar(false);
      }))
      .subscribe((data: IContent) => {
        Utilities.save(data.body, data.fileName);
      });
  }
}
