import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Form from './Model-Examples/Form';
import Page from './Model-Examples/Page';
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
  
  let location = useLocation();
  const [isReference,setisReference] = useState(false); 
  useEffect(()=>{
    let l = location.pathname.split('/')
    if(l[1]==='reference'){
      setisReference(true)
    }
    else{
      setisReference(false)
    }
  },[location])

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
                      to="/reference/rest/auth/signup"
                      routerLinkActive="router-link-active"
                      onClick={(e) => setisReference(true,e)}
                      >reference
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
      {isAutheticated || isReference ?
      <></>
      :
      <Navigate to="/"></Navigate>
      }
      {isAutheticated ?
      <Routes>
        <Route path="/model-examples" element={<Page />}></Route>
        <Route path="/model-examples/:model" element={<Form />}></Route>
        <Route path="/reference" element={<Reference />}></Route>
        <Route path="/reference/:tag" element={<Reference />}></Route>
        <Route path="/reference/:tag/:name" element={<Reference />}></Route>
        <Route path="/reference/:tag/:name/:value" element={<Reference />}></Route>
      </Routes>
      :
      <Routes>
        <Route path="/reference" element={<Reference />}></Route>
        <Route path="/reference/:tag" element={<Reference />}></Route>
        <Route path="/reference/:tag/:name" element={<Reference />}></Route>
        <Route path="/reference/:tag/:name/:value" element={<Reference />}></Route>
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
