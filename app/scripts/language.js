class Language {
  constructor (language, count, color) {
    this.language = language || "Others";
    this.count = count || 0;
    this.color = color;
  }
}
module.exports = Language;
