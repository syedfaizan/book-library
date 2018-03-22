const bookController = require('../controllers/book');
const router = require('express').Router();

router.post('/',(req, res, next)=> {
    let body = req.body;
    return bookController.create(body)
        .then( res.preparePayload )
        .catch(next);
});

router.get('/',(req, res, next ) => {
    return bookController.list()
        .then( res.preparePayload )
        .catch(next);        
})

router.get('/:id', (req, res, next ) => {
    return bookController.read(req.params.id)
        .then( res.preparePayload )
        .catch(next);
})

router.delete('/:id', (req, res, next ) => {
    return bookController.remove(req.params.id)
        .then( res.preparePayload )
        .catch(next);
})

module.exports = router;
