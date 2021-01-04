const BASEURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
const KEY = `19641016-0771c97f44f84fb3a7a4f0c18`;

export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const res = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=19641016-0771c97f44f84fb3a7a4f0c18`,
    );

    const data = await res.json();

    this.incrementPage();

    return data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    this.searchQuery = value;
  }
}
