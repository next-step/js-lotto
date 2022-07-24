import { getObjectConvertArrayToHtmlText } from '../../utills/index.js';

const pipe = (initialValue, ...funcs) => {
  return funcs.reduce((response, func) => {
    return func(response);
  }, initialValue);
};

const DrawForm = ({ target, input, form, validation = (value) => value, logic = (value) => value }) => {
  const RenderDrawList = (event) => {
    event.preventDefault();
    const quantity = input.value;

    const drawList = pipe(quantity, validation, logic, getObjectConvertArrayToHtmlText);

    render(drawList);
  };

  const render = ({ title, show, hide }) => {
    target.title.innerHTML = title;
    target.show.innerHTML = show;
    target.hide.innerHTML = hide;
  };

  form.addEventListener('submit', RenderDrawList);
};

export default DrawForm;
