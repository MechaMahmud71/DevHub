class Repository {
  constructor(name, language, link, description, avater, stars, forks) {
    this.name = name;
    this.language = language;
    this.link = link;
    this.description = description;
    this.avater = avater;
    this.stars = stars;
    this.forks = forks;

  }
}
module.exports = Repository;