export const inject = (provide: string, useClass: any) => {
  return {
    provide,
    useClass,
  };
};
