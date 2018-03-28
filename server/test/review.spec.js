const expect = require('chai').expect;
const sinon = require('sinon');
const reviewController = require('../controllers/review');

describe("Testing: Review controller ", () => {
    const sampleBookId = 1;
    const sampleReviewResponseObject = {
        "id": 10,
        "comment": "I was shoicked after8 days",
        "rating": "4",
        "UserId": 1,
        "BookId": 1,
        "updatedAt": "2018-03-27T17:26:48.616Z",
        "createdAt": "2018-03-27T17:26:48.616Z"
    };
    const samepleReviews = [{
        "id": 2,
        "comment": "Mind blowing film, best film 2014!",
        "rating": "5",
        "UserId": 1,
        "BookId": 1,
        "createdAt": "2018-03-25T21:00:48.984Z",
        "updatedAt": "2018-03-25T21:00:48.984Z",
        "User": {
            "id": 1,
            "username": "syedfaizan",
            "createdAt": "2018-03-25T06:46:00.193Z",
            "updatedAt": "2018-03-25T06:46:00.193Z"
        },
        "Book": {
            "id": 1,
            "title": "Interstellar",
            "ISBN": 3,
            "UserId": 1,
            "createdAt": "2018-03-22T18:13:23.795Z",
            "updatedAt": "2018-03-22T18:13:23.795Z"
        }
    }];

    const sampleReviewRequestObject = {
        "comment": "I was shoicked after8 days",
        "rating": "4",
    };

    beforeEach(() => {
        sinon.stub(reviewController, 'create').resolves(sampleReviewResponseObject);
        sinon.stub(reviewController, 'list').resolves(samepleReviews);
        sinon.stub(reviewController, 'fetch').resolves(samepleReviews);
        
    });

    afterEach(() => {
        reviewController.create.restore();
        reviewController.list.restore();
        reviewController.fetch.restore();
        
    });

    it('Review:Create - should create a new Review', done => {
        reviewController.create(sampleReviewRequestObject)
            .then(response => {
                expect(response).to.have.property('id');
                expect(response).to.have.property('UserId');
                expect(response).to.have.property('BookId');
                expect(response).to.be.a('object');
                done();
            })
    });

    it('Review:List - should list all reviews', done => {
        reviewController.list()
            .then( response => {
                expect(response).to.be.a('array');
                expect(response[0]).to.have.property('UserId');
                expect(response[0]).to.have.property('BookId');
                done();
            })
    });

    it("Review:Fetch - should fetch all reviews for a particular book", done => {
        reviewController.fetch(sampleBookId)
            .then( response => {
                expect(response).to.be.a('array');
                expect(response[0]).to.have.property('UserId');
                done();
            })
    })
});