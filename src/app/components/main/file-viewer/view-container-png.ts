import { ViewContainerBase } from './view-container-base';
import { MimeType } from "../../../models/enums/mime-type";

export class ViewContainerPNG extends ViewContainerBase {
  constructor() {
    super(MimeType.PNG);
  }
}
