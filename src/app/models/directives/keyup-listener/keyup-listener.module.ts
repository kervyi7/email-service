import { NgModule } from '@angular/core';
import { KeyupListenerDirective } from './keyup-listener.directive';

@NgModule({
  declarations: [KeyupListenerDirective],
  exports: [KeyupListenerDirective]
})
export class KeyupListenerModule { }