const initialState = {
  phoneNumber: "",
  amount: "",
  creditCard: {},
  payeeInfo: {},
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case "Create":
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
        amount: action.payload.amount,
        creditCard: action.payload.creditCard
      };
      
      case "StorePayee":
        return {
          ...state,
          payeeInfo: action.payload.payee
        }
    default:
      return state;
  }
}
