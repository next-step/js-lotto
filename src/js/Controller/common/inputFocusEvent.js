const inputFocusEvent = (function() {

  const addBorderColor = event => {
    const { classList } = event.target
    classList.add("focused")
    event.target.focus()
  }

  return {
    addFocusStyle(tag) {
      tag.addEventListener("focus", addBorderColor, true);
    },
    removeFocusStyle(tag) {
      tag.classList.remove('focused')
      tag.removeEventListener("focus", addBorderColor, true)
    }
  }
})()

export default inputFocusEvent;
