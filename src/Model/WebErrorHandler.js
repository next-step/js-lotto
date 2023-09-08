export class WebErrorHandler {
  static catcher(method) {
    try {
      return method();
    } catch (error) {
      alert(error.message);

      return null;
    }
  }
}
