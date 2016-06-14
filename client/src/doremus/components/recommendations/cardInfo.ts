export class RecommendationCardInfo {
  id: string;
  title: string;
  subtitle:string;
  constructor(id, title = null, subtitle = null)
  {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
  }
}
