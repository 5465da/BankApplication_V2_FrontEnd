const initialState = {
  accountNumber: "",
  amount: "",
  name: "",
  creditCard: {},
  payeeInfo: {},
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case "Create":
      return {
        ...state,
        accountNumber: action.payload.accountNumber,
        amount: action.payload.amount,
        creditCard: action.payload.creditCard,
        name: action.payload.name,
      };

    case "StorePayee":
      return {
        ...state,
        payeeInfo: action.payload.payee,
      };
    default:
      return state;
  }
}
