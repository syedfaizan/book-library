const reviewController = require('../controllers/review');
const router = require('express').Router();

router.post('/',(req, res, next)=> {
    let body = req.body;
    body.UserId = req.user.id;
    return reviewController.create(body)
        .then( res.preparePayload )
        .catch(next);
});

router.get('/',(req, res, next ) => {
    let queryParams = req.query;
    return reviewController.list(queryParams)
        .then( res.preparePayload )
        .catch(next);        
})

router.get('/:bookId', (req, res, next) => {
    let BookId = req.params.bookId;
    return reviewController.fetch(BookId)
        .then( res.preparePayload )
        .catch( next );
})

module.exports = router;
