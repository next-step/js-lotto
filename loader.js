import { isBuiltin } from 'node:module';

export const resolve = (specifier, context, nextResolve) =>
  nextResolve(isBuiltin(specifier) || specifier.endsWith('.js') ? specifier : `${specifier}.js`, context);
