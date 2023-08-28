export const $ = <T extends Element>(selector: string) => document.querySelector<T>(selector);
