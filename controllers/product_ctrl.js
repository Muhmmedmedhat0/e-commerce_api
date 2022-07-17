const productCtrl = {
  getAll: async (req, res, next) => {
    try {
      res.send('hello world');
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productCtrl;
