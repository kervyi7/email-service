import * as saveAs from "file-saver";
import { FileExtension } from "../enums/file-extension";
import { Converter } from "./converter";

export class Utilities {
  public static getFileIconByExtension(type: string): string {
    type = type.toLowerCase();
    switch (type) {
      case FileExtension.PDF:
        return "picture_as_pdf";
      case FileExtension.GIF:
      case FileExtension.JPG:
      case FileExtension.JPEG:
      case FileExtension.PNG:
        return "photo";
      case FileExtension.TXT:
      case FileExtension.JSON:
      case FileExtension.XLS:
      case FileExtension.XLSX:
      case FileExtension.DOC:
      case FileExtension.DOCX:
        return "description";
      default:
        return "note";
    }
  }

  public static save(base64: string, fileName: string) {
    saveAs(Converter.base64ToFile(base64, fileName));
  }

  public static saveDataInStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public static getDataFromStorage(key: string) {
    return sessionStorage.getItem(key);
  }
}