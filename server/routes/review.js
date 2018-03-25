const reviewController = require('../controllers/review');
const router = require('express').Router();

router.post('/',(req, res, next)=> {
    let body = req.body;
    return reviewController.create(body)
        .then( res.preparePayload )
        .catch(next);
});

router.get('/',(req, res, next ) => {
    let queryParams = req.query;
    queryParams = Object.assign( {UserId: req.user.id }, queryParams);
    return reviewController.list(queryParams)
        .then( res.preparePayload )
        .catch(next);        
})

module.exports = router;
