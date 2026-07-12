import prisma from "../config/prisma.js";

const createOrder = async (userId) => {

  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;

  for (const item of cart.items) {

    if (item.quantity > item.product.stock) {
      throw new Error(`${item.product.title} is out of stock`);
    }

    totalPrice += item.product.price * item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice,
    },
  });

  for (const item of cart.items) {

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      },
    });

    await prisma.product.update({
      where: {
        id: item.productId,
      },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return order;
};

const getMyOrders = async (userId) => {

  return prisma.order.findMany({

    where: {
      userId,
    },

    include: {

      items: {

        include: {
          product: true,
        },

      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

export {
  createOrder,
  getMyOrders,
};