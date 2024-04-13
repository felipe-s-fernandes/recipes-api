export default class Recipe {
  constructor({ id, userId, title, description }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
  }
}
