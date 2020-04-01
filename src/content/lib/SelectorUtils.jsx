import finder from "@medv/finder";

export const getShortSelector = elem => {
  const selector = finder(elem, {
    className: name => {
      return !name.startsWith("abba-");
    }
  });
  return selector;
};

export const getLongSelector = elem => {
  const selector = finder(elem, {
    className: name => {
      return !name.startsWith("abba-");
    },
    seedMinLength: 5,
    optimizedMinLength: 5
  });
  return selector;
};
