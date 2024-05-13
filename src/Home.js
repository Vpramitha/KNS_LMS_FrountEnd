/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css';
import drona_view from './Images/drona_view.jpg';
import Library_kns from './Images/Library_kns.jpg';
import Weston_Band from './Images/Weston_Band.jpg';


//import { await } from 'react-router-dom';

const Home = ()=> {

  return (
    <div className="Home">
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><b>The Library Management Syatem,<br/> R/Kalawana National School</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="">Link</a>
        </li>
      </ul>
      
        <button class="btn btn-outline-success text-bg-success" onClick={() => {window.location.href = "/Login"}}>
        Sign In
        </button>
      
    </div>
  </div>
</nav>



<section class="background-radial-gradient overflow-hidden">
 

  <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div class="row gx-lg-5 align-items-center mb-5">
      <div class="col-lg-6 mb-5 mb-lg-0" >
        <h1 class="my-5 display-5 fw-bold ls-tight" >
          Welcome <br />
          To the Library Management System<br/>Of R/Kalawana National School
        </h1>
        <p class="mb-4 opacity-70" >
          ර/කලවාන ජාතික පාසල, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
      <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
      <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

      <div className="card bg-glass">
        <div className="card-body px-2 py-2 px-md-5">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <img src={drona_view} className="img-fluid" alt="DronaView" />
            <div className="row justify-content-center"> {/* New row for Library and Weston images */}
              <div className="col-6 ">
                <img src={Library_kns} className="img-fluid px-1 py-2"  alt="Library_kns" />
              </div>
              <div className="col-6">
                <img src={Weston_Band} className="img-fluid px-1 py-2"  alt="Weston_Band" />
              </div>
            </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<footer class="text-center text-lg-start bg-body-tertiary text-muted">
  <section class="">
    <div class="container text-center text-md-start mt-3">
      
      <div class="row mt-3">
        
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Company name
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        
        
        
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3"></i> Ratnapura Road. Kalawana, Sabaragamuwa 70450, LK.</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            rkalawanans@gmail.com
          </p>
          <p><i class="fas fa-phone me-3"></i> 0452 255 136</p>
          
        </div>
        
      </div>
      
    </div>
  </section>
  
  <div class="text-center p-4" >
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  
</footer>




        </div>
  );
}

export default Home;