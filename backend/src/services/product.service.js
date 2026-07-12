import prisma from "../config/prisma.js";

const createProduct = async (data) => {
  return await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image || null,
    },
  });
};

const getProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const minPrice = query.minPrice
    ? Number(query.minPrice)
    : undefined;

  const maxPrice = query.maxPrice
    ? Number(query.maxPrice)
    : undefined;

  const sort = query.sort || "newest";

  const where = {
    title: {
      contains: search,
      mode: "insensitive",
    },
  };

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  let orderBy = {
    createdAt: "desc",
  };

  if (sort === "priceAsc") {
    orderBy = {
      price: "asc",
    };
  }

  if (sort === "priceDesc") {
    orderBy = {
      price: "desc",
    };
  }

  if (sort === "newest") {
    orderBy = {
      createdAt: "desc",
    };
  }

  const products = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await prisma.product.count({
    where,
  });

  return {
    products,
    totalProducts: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image,
    },
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};