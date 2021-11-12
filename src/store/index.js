import React, { createContext } from "react";
export const Mycontext = createContext();

export const istate = {
  name: "tushar",
  loadingschemeData: false,
  schemeData: [],
  lottoryDetails: [],
};
const addScheneData = (state, action) => {
  return {
    ...state,
    schemeData: action.payload,
    // lottoryDetails: action.payload,
  };
};
// const addLottoryData = (state, action) => {
//   return {
//     ...state,
//     // schemeData: action.payload,
//     lottoryDetails: action.payload,
//   };
// };

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return {
        name: "bhargav",
      };
    case "START_SCHEMEDATA":
      return {
        ...state,
        loadingschemeData: true,
      };
    case "ADD_SCHEMEDATA":
      return addScheneData(state, action);
    case "END_SCHEMEDATA":
      return {
        ...state,
        loadingschemeData: false,
      };
    case "START_LOTTORYDATA":
      return {
        ...state,
        loadingschemeData: true,
      };

    // case "END_LOTTORYDATA":
    //   return {
    //     ...state,
    //     loadingschemeData: false,
    //   };
    default:
      return state;
  }
};
