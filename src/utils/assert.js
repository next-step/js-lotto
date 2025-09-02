export function assert(condition, error) {
  if (condition) {
    return;
  }

  if (typeof error === "string") {
    throw new Error(error);
  }

  throw error;
}
