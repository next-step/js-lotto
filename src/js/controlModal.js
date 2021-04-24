import { $ } from "./dom.js";

const $modal = $(".modal");

export const onModalShow = () => {
  $modal.classList.add("open");
};

export const onModalClose = () => {
  $modal.classList.remove("open");
};
