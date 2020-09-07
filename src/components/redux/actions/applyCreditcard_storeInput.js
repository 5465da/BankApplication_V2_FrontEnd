export function storeInput(...formInputs) {
    return {
      type: "Create",
      payload: {
        creditcardName: formInputs[0],
        selectedCardType: formInputs[1],
      },
    };
  }