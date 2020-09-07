const initialState = {
    creditcardName: "",
    selectedCardType: "",
  };
  
  export default function formReducer(state = initialState, action) {
    switch (action.type) {
      case "Create":
        return {
          ...state,
          creditcardName: action.payload.creditcardName,
          selectedCardType: action.payload.selectedCardType,
        };
        
      default:
        return state;
    }
  }
  