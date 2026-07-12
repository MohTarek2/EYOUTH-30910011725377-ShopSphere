import {
  createOrder,
  getMyOrders,
} from "../services/order.service.js";

const create = async (req, res) => {

  try {

    const order = await createOrder(req.user.id);

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

const getMine = async (req, res) => {

  try {

    const orders = await getMyOrders(req.user.id);

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export {
  create,
  getMine,
};