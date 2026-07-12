import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
} from "../services/cart.service.js";

const add = async (req, res) => {
  try {
    const item = await addToCart(
      req.user.id,
      Number(req.body.productId),
      Number(req.body.quantity)
    );

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const cart = await getCart(req.user.id);

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const item = await updateQuantity(
      req.params.id,
      Number(req.body.quantity)
    );

    res.json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await removeItem(req.params.id);

    res.json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const clear = async (req, res) => {
  try {
    await clearCart(req.user.id);

    res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  add,
  get,
  update,
  remove,
  clear,
};