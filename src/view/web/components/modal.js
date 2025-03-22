function createModalContainer() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  return modalContainer;
}

function createModalContentWrapper() {
  const modalContent = document.createElement("section");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", closeModal);
  modalContent.append(closeButton);

  return modalContent;
}

function createModalHeader(title) {
  const modalHeader = document.createElement("header");
  modalHeader.textContent = title;

  return modalHeader;
}

function createModalButton(text, onClick) {
  const modalButton = document.createElement("button");
  modalButton.classList.add("modal-button");
  modalButton.textContent = text;
  modalButton.addEventListener("click", () => {
    onClick();
    closeModal();
  });

  return modalButton;
}

function createModalText(text) {
  const modalText = document.createElement("p");
  modalText.classList.add("modal-text");
  modalText.textContent = text;
  return modalText;
}

function createModalTableHeader(columns) {
  const header = document.createElement("thead");
  const headerLow = document.createElement("tr");

  const headerCells = columns.map((column) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = column;
    return headerCell;
  });

  headerLow.append(...headerCells);
  header.append(headerLow);

  return header;
}

function createModalTableBody(rows) {
  const body = document.createElement("tbody");

  const bodyRows = rows.map((row) => {
    const bodyRow = document.createElement("tr");
    const bodyCells = row.map((cell) => {
      const bodyCell = document.createElement("td");
      bodyCell.textContent = cell;
      return bodyCell;
    });

    bodyRow.append(...bodyCells);
    return bodyRow;
  });

  body.append(...bodyRows);

  return body;
}

function createModalContent(columns, rows) {
  const table = document.createElement("table");

  const header = createModalTableHeader(columns);
  const body = createModalTableBody(rows);

  table.append(header, body);

  return table;
}

export function createModal({
  title,
  text,
  buttonText,
  onClick,
  columns = [],
  rows = [],
}) {
  const modalContainer = createModalContainer();
  const modalContentWrapper = createModalContentWrapper();

  const modalHeader = createModalHeader(title);
  const modalContent = createModalContent(columns, rows);
  const modalText = createModalText(text);
  const modalButton = createModalButton(buttonText, onClick);

  modalContentWrapper.append(modalHeader, modalContent, modalText, modalButton);
  modalContainer.append(modalContentWrapper);

  return modalContainer;
}

export function closeModal() {
  const modal = document.querySelector(".modal-container");
  modal.remove();
}
