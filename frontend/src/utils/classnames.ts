const getClassNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export { getClassNames };
