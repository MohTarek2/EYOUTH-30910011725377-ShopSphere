import prisma from "../config/prisma.js";

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  return cart;
};

const addToCart = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Not enough stock");
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: Number(productId),
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: Number(productId),
      quantity,
    },
  });
};

const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const data = await prisma.cart.findUnique({
    where: {
      id: cart.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalPrice = data.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return {
    ...data,
    totalPrice,
  };
};

const updateQuantity = async (itemId, quantity) => {
  const item = await prisma.cartItem.findUnique({
    where: {
      id: Number(itemId),
    },
    include: {
      product: true,
    },
  });

  if (!item) {
    throw new Error("Cart item not found");
  }

  if (quantity > item.product.stock) {
    throw new Error("Not enough stock");
  }

  return prisma.cartItem.update({
    where: {
      id: Number(itemId),
    },
    data: {
      quantity,
    },
  });
};

const removeItem = async (itemId) => {
  return prisma.cartItem.delete({
    where: {
      id: Number(itemId),
    },
  });
};

const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  return prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });
};

export {
  addToCart,
  getCart,
 updateQuantity,
  removeItem,
  clearCart,
};