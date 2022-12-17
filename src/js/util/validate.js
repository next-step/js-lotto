export const validateWithMsg = (data, condition, errorMsg) => {
  try {
    if (condition(data)) throw errorMsg
  } catch (e) {
    window.alert(e)
    return false
  }
}
