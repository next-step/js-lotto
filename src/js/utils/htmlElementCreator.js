
const createEle = (eleCatg) => (attributes) => setAttributes(document.createElement(eleCatg), attributes)
const setAttributes = (ele, attributes) => {
    Object.keys(attributes)
    .forEach(attribute => {
        ele.setAttribute(attribute, attributes[attribute])
    })
    return ele
}

export const div = (attributes) => createEle('div')(attributes)
export const form = (attributes) => createEle('form')(attributes)
export const label = (attributes) => createEle('label')(attributes)
export const input = (attributes) => createEle('input')(attributes)
export const button = (attributes) => createEle('button')(attributes)
export const section = (attributes) => createEle('section')(attributes)



