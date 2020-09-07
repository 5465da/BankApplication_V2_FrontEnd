export const userInfo = (name, id) => {
  return {
      type: "LOGIN",
      name: name,
      id: id
  }
};