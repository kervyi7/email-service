import { FileExtension } from '../../../models/enums/file-extension';
import { ViewContainerBase } from './view-container-base';
import { ViewContainerPDF } from './view-container-pdf';
import { ViewContainerJPG } from './view-container-jpg';
import { ViewContainerJPEG } from './view-container-jpeg';
import { ViewContainerPNG } from './view-container-png';
import { ViewContainerTXT } from './view-container-txt';

export abstract class ViewContainerFactory {
  public static create(type: string): ViewContainerBase | null {
    switch (type) {
      case FileExtension.PDF:
        return new ViewContainerPDF();
      case FileExtension.JPG:
        return new ViewContainerJPG();
      case FileExtension.JPEG:
        return new ViewContainerJPEG();
      case FileExtension.PNG:
        return new ViewContainerPNG();
      case FileExtension.TXT:
        return new ViewContainerTXT();
      default:
        return null;
    }
  }
}
