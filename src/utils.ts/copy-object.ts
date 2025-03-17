export const copyObject = <Obj extends Object>(from: Obj, to: Obj) => {
  Object.entries(from).forEach(([key, value]) => {
    // @ts-ignore
    to[key] = value;
  });
};
