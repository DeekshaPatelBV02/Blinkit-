export const totalItem = (cart) => {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce((sum, product) => {
    if (!product || !product.quantity) return sum;
    return sum + product.quantity;
  }, 0);
};

export const totalPrice = (cart) => {
  if (!Array.isArray(cart)) return 0;

  return cart.reduce((total, product) => {
    if (!product || !product.quantity || !product.price) return total;
    return total + product.quantity * product.price;
  }, 0);
};

const CartReducer = (state, action) => {

  switch (action.type) {

    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : [];

    case "SET_ADDRESS":
      return state;

    case "Add": {
  const exist = state.find(
    (item) => item._id === action.product._id.toString()
  );

  if (exist) {
    return state.map((item) =>
      item._id === action.product._id.toString()
        ? { 
            ...item, 
            quantity: item.quantity + 1,
            file: item.file || action.product.file   
          }
        : item
    );
  }

  return [
    ...state,
    {
      _id: action.product._id.toString(),
      name: action.product.name,
      price: action.product.price,
      file: action.product.file,  
      quantity: 1
    }
  ];
}
    case "Remove":
      return state.filter(p => p._id !== action.id);

    case "Increase":
      return state.map(p =>
        p._id === action.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );

    case "Decrease":
      return state.map(p =>
        p._id === action.id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
export default CartReducer;