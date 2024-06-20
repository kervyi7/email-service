import { IContent } from "../interfaces/content";

export class Converter {
  public static base64ToFile(base64: string, filename: string, options?: FilePropertyBag): File {
    const bstr = atob(base64);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, options);
  }

  public static toFileSrc(content: IContent): string {
    return `data:image/${content.mediaSubtype};base64, ${content.body}`;
  }
}