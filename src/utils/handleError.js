export async function handleError(operation, onError) {
  try {
    return await operation();
  } catch (error) {
    if (onError) onError?.(error);
    if (!onError) alert(error.message);

    console.error(error);
  }
}
