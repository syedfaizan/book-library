import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import BookCreate from './BookCreate';
import assert from 'assert';

let div = document.createElement('div');

beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
});

it('Render #BookCreate Component', () => {
    ReactDOM.render(<BookCreate />, div);
});

it('should update state when input changes', ()=> {
    const app = shallow(<BookCreate />);
    const sampleISBNInput = '123';
    const sampleTitleInput = 'Harry Potter';
    let isbn = app.find('#isbnNumber');
    let title = app.find('#title');
    
    //simulate keyboard input
    isbn.simulate('change', { target: { value:  sampleISBNInput} });
    title.simulate('change', { target: { value:  sampleTitleInput} });
    
    assert.equal(app.instance().state.ISBN, sampleISBNInput);
    assert.equal(app.instance().state.title, sampleTitleInput);

})


it('should not submit when form is empty', () => {
    const bookCreate = shallow(<BookCreate />);
    const bookCreateInstance = bookCreate.instance();
    // make sure state is null
    bookCreateInstance.setState({ISBN: null});
    bookCreateInstance.setState({title: null});

    let returnValue = bookCreateInstance.handleSubmit();
    assert.equal(returnValue, 0);
})

