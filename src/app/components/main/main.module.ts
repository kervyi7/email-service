import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailComponent } from './mail/mail.component';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { KeyupListenerModule } from '../../models/directives/keyup-listener/keyup-listener.module';
import { SafeHtmlPipe } from '../../models/pipes/safe-html.pipe';
import { FileViewerComponent } from './file-viewer/file-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    KeyupListenerModule
  ],
  declarations: [
    MainComponent,
    MailListComponent,
    MailComponent,
    FileViewerComponent,
    SafeHtmlPipe,
  ],
  providers: []
})
export class MainModule { }
