class HomeController {
    index(req, res) {
      return res.json({ message: 'FBS Api Online - v0.0.6 (Complete)!' });
    }
  }
  
module.exports = new HomeController();