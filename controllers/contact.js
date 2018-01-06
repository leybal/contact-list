const Contact = require('../models/contact');


exports.getContacts = (req, res, next) => {
    Contact.find({})
        .then(contacts => {
            res.json({contacts});
        })
        .catch(next);
};


exports.create = (req, res, next) => {
    const { name, tel } = req.body,
    contact = new Contact({
        name,
        tel
    });

   contact.save()
       .then(() => {
           res.writeHead(302, {
               'Location': '/'
           });
           res.end();
       })
       .catch(next);
};


exports.delete = (req, res, next) => {
    const id = req.params.id;

    Contact.remove({_id: id}, function(err) {
        if (err) {
            console.log(err);
            res.json({
                'status': 'error'
            });
        } else {
            res.json({
                'status': 'ok'
            });
        }
    });
};


exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Contact.findOne({ _id: id })
        .then(contact => res.render('edit', {title: 'Edit contact', contact: contact} ))
        .catch(next);
};


exports.update = (req, res, next) => {
    const { name, tel, id } = req.body;

    Contact.update({ _id: id},
        {$set: {name: name, tel: tel}},
        function (err, result) {
            if (err) throw err;
            console.log(result);
        })
        .then(()=>{
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        })
        .catch(next)
};