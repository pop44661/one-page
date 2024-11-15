import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React, {
  Fragment,
  useState,
} from 'react';

import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import ImgGeneration from './ImgGeneration/ImgGeneration';
import Form from './Model-Examples/Form';
import Page from './Model-Examples/Page';
import ModelDetect from './Model/From/ModelDetect';
import ModelTest from './Model/From/ModelTest';
import ModelTrain from './Model/From/ModelTrain';
import ModelPage from './Model/ModelPage';
import Reference from './Reference/Reference';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';

function AppDev() {
  
  const [isNavCollapsed, setisNavCollapsed] = useState(true);
  const handleNavCollapse = () => setisNavCollapsed(!isNavCollapsed);

  const [showSignDropdown, setshowSignDropdown] = useState(true);
  const handleSignDropdown = () => setshowSignDropdown(!showSignDropdown);

  const [isAutheticated,setisAutheticated] = useState(false);
  const handleisAutheticated = (auth) => setisAutheticated(auth)
  
  

  return (
    <Fragment>
      <div class='background'>
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <Link class="navbar-brand" to="/" >Instai</Link>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class={`${isNavCollapsed ? 'collapse' : 'collapse show'} navbar-collapse`}  id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/" 
                      >IMTP
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      to="/model-examples"
                      routerLinkActive="router-link-active"
                      >model-examples
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link disabled" aria-disabled="true" >Admin</Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      to="/reference/rest/v2/auth/signup"
                      routerLinkActive="router-link-active"
                      >reference
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      to="/imggeneration"
                      routerLinkActive="router-link-active"
                      >imggeneration
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class="nav-link"
                      to="/model"
                      routerLinkActive="router-link-active"
                      >model
                    </Link>
                  </li>
                </ul>
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    disabled
                  />
                  <button class="btn btn-outline-success" type="submit" disabled>
                    Search
                  </button>
                </form>
                {/* <app-signin  (toggleSignupDropdown)="toggleSignUpForm()" class="ms-2"></app-signin>
                <app-signup  (toggleSignInDropdown)="toggleSignInForm()"class="ms-2"></app-signup> */}
                {/* 根據 showSignUpForm 來顯示 SignupComponent */}
                {/* <app-signin [showDropdown]="showSignInDropdown && !showSignUpDropdown" (toggleSignUpDropdown)="toggleSignUpDropdown()" class="ms-2"></app-signin>
                <app-signup [showDropdown2]="showSignUpDropdown && !showSignInDropdown"(toggleSignInDropdown)="toggleSignInDropdown()" class="ms-2"></app-signup> */}
                {showSignDropdown ?
                  <Signin handleSignDropdown={handleSignDropdown} isAutheticated={isAutheticated} handleisAutheticated={handleisAutheticated}/>
                  :
                  <Signup handleSignDropdown={handleSignDropdown} />
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {isAutheticated ?
      <Routes>
        <Route path="/model-examples" element={<Page />}></Route>
        <Route path="/model-examples/:model" element={<Form />}></Route>
        <Route path="/imggeneration" element={<ImgGeneration />}></Route>
        <Route path="/Model" element={<ModelPage />}></Route>
        <Route path="/model/modeldetect" element={<ModelDetect />}></Route>
        <Route path="/model/modeltrain" element={<ModelTrain />}></Route>
        <Route path="/model/modeltest" element={<ModelTest />}></Route>
        <Route path="/reference" element={<Reference />}></Route>
        <Route path="/reference/:ref1" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2/:ref3" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2/:ref3/:ref4" element={<Reference />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      :
      <Routes>
        <Route path="/reference" element={<Reference />}></Route>
        <Route path="/reference/:ref1" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2/:ref3" element={<Reference />}></Route>
        <Route path="/reference/:ref1/:ref2/:ref3/:ref4" element={<Reference />}></Route>
        <Route path="/imggeneration" element={<ImgGeneration />}></Route>
        <Route path="/Model" element={<ModelPage />}></Route>
        <Route path="/model/modeldetect" element={<ModelDetect />}></Route>
        <Route path="/model/modeltrain" element={<ModelTrain />}></Route>
        <Route path="/model/modeltest" element={<ModelTest />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      }
    </Fragment>
  );
}

function App() {
  return (
    <Router>
      <AppDev/>
    </Router>
  );
}

export default App;
