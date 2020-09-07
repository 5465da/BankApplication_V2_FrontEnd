let initialValue = {
    name: "",
    id: ""
}

export const userInfo = (state = initialValue, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                name: action.name,
                id: action.id            
            }
        default:
            return state;
    }
}