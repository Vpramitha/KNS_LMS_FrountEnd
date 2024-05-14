import 'bootstrap/dist/css/bootstrap.min.css';
//import { response } from 'express';
import NavigationBar from './NavBar.js';

import { useState } from 'react';

import { Container } from 'react-bootstrap';

function AddNewBook() {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Price, setPrice] = useState("");

  function HandleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Title " + Title +" Author "+ Author + " Price "+ Price);
    
    let BookData={
          Title:Title,
          Author:Author,
          Price:Price
    }
    
    console.log("clicked");

    fetch("http://localhost:3000/AddBook",{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(BookData)
    }).then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
     }
      return response.json(); // Parse JSON from the response
          }).then(data => {
                  console.log(data.message);
                  alert(data.message);  
                  window.location.href = `/Catalog`;               // Handle the response data
        })
  }

  return (
    <div className="AddNewBook">
    <NavigationBar showSearch={false}/>
      <section className="vh-90 pt-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={HandleSubmit}>
              <h1>ADDING NEW BOOK</h1>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="bookTitle">The Book Title</label>
                  <input type="text" id="bookTitle" className="form-control form-control-lg" placeholder='Enter the Book Name' onChange={e => { setTitle(e.target.value) }} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="bookAuthor">Author</label>
                  <input type="text" id="bookAuthor" className="form-control form-control-lg" placeholder='Enter Author of the book' onChange={e => { setAuthor(e.target.value) }} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="bookPrice">The Book Price</label>
                  <input type="text" id="bookPrice" className="form-control form-control-lg" placeholder='Enter Price of the book' onChange={e => { setPrice(e.target.value) }}/>
                </div>

                <Container className="d-flex justify-content-center align-items-center mt-4 mb-3">
                  <div className='px-2'>
                    <button type="button" className="btn btn-danger btn-lg btn-block">Clear All</button>
                  </div>
                  <div className='px-2'>
                    <button type="submit" className="btn btn-success btn-lg btn-block" >Add Book</button>
                  </div>
                </Container>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddNewBook;
