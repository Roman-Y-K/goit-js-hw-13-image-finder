import ApiService from "./api-service";
import imageCardTpl from "../templates/image-template.hbs";
import refs from "./refs";
import scrollWindow from "./scroll-interface";

const fetchService = new ApiService();

refs.formRef.addEventListener("submit", onSearchImages);
refs.btnLoadRef.addEventListener("click", onLoadMore);

function onSearchImages(evn) {
  evn.preventDefault();

  fetchService.query = evn.target.elements.query.value;

  if (!fetchService.query) {
    clearInterface();
    return;
  }

  fetchService.resetPage();

  try {
    fetchService.fetchImages().then((data) => {
      clearInterface();
      createMarkap(data);
    });
  } catch (err) {
    throw err;
  }
}

function clearInterface() {
  refs.galleryRef.innerHTML = "";
  refs.btnLoadRef.classList.add("is-hidden");
}

function onLoadMore() {
  try {
    fetchService.fetchImages().then((data) => {
      createMarkap(data);
      scrollWindow();
    });
  } catch (err) {
    throw err;
  }
}

function createMarkap(array) {
  if (array.length === 0) {
    alert("Nothing found");
    return;
  }

  const markap = imageCardTpl(array);
  refs.galleryRef.insertAdjacentHTML("beforeend", markap);
  refs.btnLoadRef.classList.remove("is-hidden");
}
