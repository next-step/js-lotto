export default function commit({ state, mutation, getter }) {
  return (name, payload) => {
    const mutate = mutation[name];
    if (!mutate) {
      throw new Error(`${name} is not found in mutation`);
    }
    mutate({ state, mutation, getter }, payload);
  };
}
