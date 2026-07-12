const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { title, description, price, stock } = req.body;

  if (!title || !description || price == null || stock == null) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (Number(price) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0",
    });
  }

  if (Number(stock) < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative",
    });
  }

  next();
};

export {
  validateRegister,
  validateProduct,
};