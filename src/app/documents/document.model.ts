export class Document {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public locationUrl: string,
    public children: Document[]
  ) {}
}
