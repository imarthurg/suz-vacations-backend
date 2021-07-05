interface IMail {
  send(data: IMailData): Promise<void>;
}

interface IMailData {
  to: string;
  from: string;
  subject: string;
  text?: string;
  template?: {
    name: string;
    data: any;
  };
}

export { IMail, IMailData };
