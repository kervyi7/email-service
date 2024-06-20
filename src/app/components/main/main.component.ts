import { Component } from '@angular/core';
import { slideInOutAnimation } from '../../models/animations/slide-in-out.animation';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slideInOutAnimation]
})
export class MainComponent {

  constructor(private _contexts: ChildrenOutletContexts) {

  }
  public getAnimationStep(): number {
    return this._contexts.getContext('primary')?.route?.snapshot?.data['animation'];
  }
}
