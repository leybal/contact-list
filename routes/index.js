const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact list' });
});
router.get('/add', function(req, res) {
    res.render('add', { title: 'Add contact' });
});
router.post('/add-contact', contact.create);
router.post('/contacts', contact.getContacts);
router.delete('/contact/:id', contact.delete);
router.get('/contact/:id', contact.getOne);
router.post('/update', contact.update);

module.exports = router;