export interface ISimpleContent {
  contentId: string;
  fileName: string;
  mimeType: string;
  mediaSubtype: string;
  mediaType: string;
  isAttachment: boolean;
}

export interface IContent extends ISimpleContent {
  body: string;
}