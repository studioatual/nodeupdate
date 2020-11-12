class HomeController {
    index(req, res) {
      return res.json({ message: 'FBS Api Online - v0.0.6 (Complete)!' });
    }
    show(req, res) {
      return res.render('home', { title: 'My App' })
    }
  }
  
module.exports = new HomeController();