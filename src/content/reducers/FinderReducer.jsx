/*global chrome*/
const initialState = {
  finderState: {
    isClassEnabled: true,
    isIdEnabled: true,
    isTagEnabled: true,
    classFilter: [],
    idFilter: [],
    tagFilter: [],
    seedMinLength: 1,
    optimizedMinLength: 4,
    errorMessage: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
  }
  return state;
}
