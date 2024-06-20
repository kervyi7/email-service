import { ViewContainerBase } from './view-container-base';
import { MimeType } from "../../../models/enums/mime-type";

export class ViewContainerJPG extends ViewContainerBase {
  constructor() {
    super(MimeType.JPG);
  }
}
