import { ViewContainerBase } from './view-container-base';
import { MimeType } from "../../../models/enums/mime-type";

export class ViewContainerJPEG extends ViewContainerBase {
  constructor() {
    super(MimeType.JPEG);
  }
}
