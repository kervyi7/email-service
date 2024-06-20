import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DisplayService } from './models/services/display.service';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private _unsubscribe$ = new Subject<void>();
  public isShowLoadBar: boolean = true;

  constructor(private _displayService: DisplayService,
    private _cd: ChangeDetectorRef,
    private _router: Router,) {
  }

  public ngOnInit(): void {
    this._displayService.stateLoadBar$.subscribe((stateLoadBar) => {
      this.isShowLoadBar = stateLoadBar;
      this._cd.detectChanges();
    });
  }

  public ngAfterViewInit(): void {
    this._router.events
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((event) => {
        if (event instanceof RouteConfigLoadEnd) {
          this.isShowLoadBar = false;
          this._unsubscribe$.next();
          this._unsubscribe$.complete();
        }
      });
  }
}
