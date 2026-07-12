const profile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export { profile };