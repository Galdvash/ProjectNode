const businessMiddleware = (req, res, next) => {
  if (req.user && req.user.isBusiness) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Business users only." });
  }
};

export default businessMiddleware;
