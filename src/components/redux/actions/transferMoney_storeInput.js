export function storeInput(...formInputs) {
  return {
    type: "Create",
    payload: {
      accountNumber: formInputs[0],
      amount: formInputs[1],
      creditCard: formInputs[2],
      name: formInputs[3],
    },
  };
}

export function storePayee(...formInputs) {
  return {
    type: "StorePayee",
    payload: {
      payee: formInputs[0],
    },
  };
}
