import { $ } from "../utils/querySelector";

const modalHandler = {
  onModalShow() {
    $(".modal").classList.add("open");
  },

  onModalClose() {
    $(".modal").classList.remove("open");
    $("tbody").innerHTML = "";
  },
};

export default modalHandler;
