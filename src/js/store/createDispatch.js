export default function createDispatch({ state, action, mutation, getter }) {
  return (name, ...payload) => {
    const act = action[name];
    if (!act) {
      throw new Error(`${name} is not found in action`);
    }
    act({ state, action, mutation, getter }, ...payload);
  };
}
