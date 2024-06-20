import { ISimpleContent } from "./content";

export interface IMail {
  id: number;
  fromName: string;
  fromAddress: string;
  subject: string;
  text: string;
  html: string;
  isContents: boolean;
  isAttachments: boolean;
  createdAt: Date;
  date: Date;
  contents: ISimpleContent[];
}