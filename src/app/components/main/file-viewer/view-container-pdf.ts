import { ViewContainerBase } from './view-container-base';
import { MimeType } from "../../../models/enums/mime-type";

export class ViewContainerPDF extends ViewContainerBase {
  public override height = 'calc(100%)';
  public override maxHeight = 'calc(100% + 50px)';
  public override maxWidth = '100%';

  constructor() {
    super(MimeType.PDF);
  }
}
