export type JavaField = {
  isAccessible: () => boolean; setAccessible: (flag: boolean) => void;
  get: (obj: object) => object;
};
