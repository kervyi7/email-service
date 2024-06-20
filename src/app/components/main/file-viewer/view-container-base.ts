import { MimeType } from "../../../models/enums/mime-type";

export abstract class ViewContainerBase {
  public type: MimeType;
  public height = '100%';
  public width = '100%';
  public backgroundColor: string = '';
  public maxHeight: string = '';
  public maxWidth: string = '';
  public marginTop: string = '';

  constructor(type: MimeType) {
    this.type = type;
  }
}
