export const withRetry = async (action) => {
  let flag = true
  let result
  while (flag) {
    try {
      result = await action()
      flag = false
    } catch (error) {
      flag = true
      console.log(error.message)
    }
  }

  return result
}
