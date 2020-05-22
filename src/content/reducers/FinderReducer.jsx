import * as Actions from "../actions/FinderActions";

const initialState = {
  settings: {
    isClassEnabled: true,
    isIdEnabled: true,
    isTagEnabled: true,
    isAttributeEnabled: false,
    classFilter: [],
    idFilter: [],
    tagFilter: [],
    attributeFilter: [],
    seedMinLength: 1,
    optimizedMinLength: 2,
    threshhold: 1000,
    maxNumberOfTries: 10000,
  },
  errorMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_FINDER_ID_ENABLED: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isIdEnabled: action.payload.enabled,
        },
      };
    }
    case Actions.SET_FINDER_CLASS_ENABLED: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isClassEnabled: action.payload.enabled,
        },
      };
    }
    case Actions.SET_FINDER_TAG_ENABLED: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isTagEnabled: action.payload.enabled,
        },
      };
    }
    case Actions.SET_FINDER_ATTRIBUTE_ENABLED: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isAttributeEnabled: action.payload.enabled,
        },
      };
    }
    case Actions.ADD_FINDER_ID_FILTER: {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.settings.idFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.settings.idFilter.slice();
        filter.push(value);
        return {
          ...state,
          settings: {
            ...state.settings,
            idFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case Actions.DELETE_FINDER_ID_FILTER: {
      let filter = state.settings.idFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        settings: {
          ...state.settings,
          idFilter: filter,
        },
      };
    }
    case Actions.ADD_FINDER_CLASS_FILTER: {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.settings.classFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.settings.classFilter.slice();
        filter.push(value);
        return {
          ...state,
          settings: {
            ...state.settings,
            classFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case Actions.DELETE_FINDER_CLASS_FILTER: {
      let filter = state.settings.classFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        settings: {
          ...state.settings,
          classFilter: filter,
        },
      };
    }
    case Actions.ADD_FINDER_TAG_FILTER: {
      let value = action.payload.value.trim();
      if (
        value !== "" &&
        state.settings.tagFilter.every((entry) => {
          return entry !== value;
        })
      ) {
        let filter = state.settings.tagFilter.slice();
        filter.push(value);
        return {
          ...state,
          settings: {
            ...state.settings,
            tagFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case Actions.DELETE_FINDER_TAG_FILTER: {
      let filter = state.settings.tagFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        settings: {
          ...state.settings,
          tagFilter: filter,
        },
      };
    }
    case Actions.ADD_FINDER_ATTRIBUTE_FILTER: {
      let name = action.payload.name.trim();
      let value = action.payload.value.trim();
      let expr =
        value == ""
          ? '"' + name + '" = "*"'
          : '"' + name + '" = "' + value + '"';

      if (
        expr !== "" &&
        state.settings.attributeFilter.every((entry) => {
          return entry !== expr;
        })
      ) {
        let filter = state.settings.attributeFilter.slice();
        filter.push(expr);
        return {
          ...state,
          settings: {
            ...state.settings,
            attributeFilter: filter,
          },
        };
      } else {
        return state;
      }
    }
    case Actions.DELETE_FINDER_ATTRIBUTE_FILTER: {
      let filter = state.settings.attributeFilter.filter((e) => {
        return e !== action.payload.value;
      });
      return {
        ...state,
        settings: {
          ...state.settings,
          attributeFilter: filter,
        },
      };
    }
    case Actions.SET_FINDER_SEED_MIN_LENGTH: {
      return {
        ...state,
        settings: {
          ...state.settings,
          seedMinLength: action.payload.value,
        },
      };
    }
    case Actions.SET_FINDER_OPTIMIZED_MIN_LENGTH: {
      return {
        ...state,
        settings: {
          ...state.settings,
          optimizedMinLength: action.payload.value,
        },
      };
    }
    case Actions.SET_FINDER_THRESHHOLD: {
      return {
        ...state,
        settings: {
          ...state.settings,
          threshhold: action.payload.value,
        },
      };
    }
    case Actions.SET_FINDER_MAX_NUMBER_OF_TRIES: {
      return {
        ...state,
        settings: {
          ...state.settings,
          maxNumberOfTries: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
}
