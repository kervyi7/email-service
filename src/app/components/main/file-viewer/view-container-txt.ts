import { ViewContainerBase } from './view-container-base';
import { MimeType } from "../../../models/enums/mime-type";

export class ViewContainerTXT extends ViewContainerBase {
  public override backgroundColor = '#fff';
  public override maxHeight = 'calc(100% - 50px)';
  public override maxWidth = 'calc(100% - 190px)';
  public override marginTop = '50px';

  constructor() {
    super(MimeType.TXT);
  }
}
