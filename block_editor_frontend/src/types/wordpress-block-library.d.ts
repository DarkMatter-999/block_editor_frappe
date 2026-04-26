declare module "@wordpress/block-library/build-module/*" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: any;
  export = mod;
}

declare module "@wordpress/block-library" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function registerCoreBlocks(...args: any[]): void;
}
