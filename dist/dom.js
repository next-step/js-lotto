const template = document.createElement('template');
const createElem = (elem) => {
    if (elem instanceof HTMLElement)
        return elem;
    template.replaceChildren();
    template.insertAdjacentHTML('afterbegin', elem);
    return template.firstElementChild;
};
const el = (parent, children = []) => {
    const parentElem = createElem(parent);
    if (children.length) {
        const frag = document.createDocumentFragment();
        children.forEach(elem => {
            frag.appendChild(createElem(elem));
        });
        parentElem.replaceChildren(frag);
    }
    return parentElem;
};
export default el;
//# sourceMappingURL=dom.js.map