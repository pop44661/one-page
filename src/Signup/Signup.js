import './Signup.css';

import React, {
  Fragment,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

const Signup = (props) => {
    const {handleSignDropdown} = props
    const [isDropDownMenu1, setisDropDownMenu1] = useState(false);
    const [isDropDownMenu2, setisDropDownMenu2] = useState(true);
    const [inprogress, setinprogress] = useState(true);
    const [signinFrom, setsigninFrom] = useState({firstname:'',lastname:'',email:'',password:'',password_check:''});

    const navigate = useNavigate();
    const SIGNUP = 'http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com/api/v2/auth/signup';

    const changeDropDown = (e) => {
        const{name,value} = e.target;
        setsigninFrom((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const onSubmit = () => {
        setinprogress(true);
        const data = JSON.stringify({
            firstname: signinFrom.firstname,
            lastname: signinFrom.lastname,
            email: signinFrom.email,
            password: signinFrom.password,
            password_check: signinFrom.password_check,
            role: "normal_user",
          });
        axios.post(SIGNUP,data,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
        })
        .then(
            navigate("/", { replace: true })
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
        
    }
    return(
        <Fragment>
            {inprogress ?
            <div class="dropdown">
                <button
                    class="btn btn-outline-primary dropdown-bs-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-display="static"
                    disabled={!inprogress}
                    onClick={() => setisDropDownMenu1(!isDropDownMenu1)}
                >
                Signup
                </button>
                <div class={`${isDropDownMenu1 ? '' : 'show'} dropdown-menu dropdown-menu-end dropdown-menu-width`}>
                <form class="px-4 py-3">
                    <div class="mb-3">
                        <label for="exampleDropdownFormUsername1" class="form-label"
                            >firstname
                        </label>
                        <input
                            name="firstname"
                            type="text"
                            class="form-control"
                            id="exampleDropdownFormUsername1"
                            placeholder="firstname"
                            value={signinFrom.firstname}
                            onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleDropdownFormUsername2" class="form-label"
                        >lastname
                        </label>
                        <input
                        name="lastname"
                        type="text"
                        class="form-control"
                        id="exampleDropdownFormUsername2"
                        placeholder="lastname"
                        value={signinFrom.lastname}
                        onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleDropdownFormEmail1" class="form-label"
                            >Email address
                        </label>
                        <input
                            name="email"
                            type="text"
                            class="form-control"
                            id="exampleDropdownFormEmail1"
                            placeholder="email@example.com"
                            value={signinFrom.email}
                            onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleDropdownFormPassword1" class="form-label"
                            >Password
                        </label>
                        <input
                            name="password"
                            type="text"
                            class="form-control"
                            id="exampleDropdownFormPassword1"
                            placeholder="Password"
                            value={signinFrom.password}
                            onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleDropdownFormPassword2" class="form-label"
                        >Confirm Password
                        </label>
                        <input
                            name="password_check"
                            type="text"
                            class="form-control"
                            id="exampleDropdownFormPassword2"
                            placeholder="Confirm Password"
                            value={signinFrom.password_check}
                            onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    {/*-- <div class="mb-3">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                        <label class="form-check-label" for="dropdownCheck">
                        Remember me
                        </label>
                    </div>
                    </div> */}
                    <button type="button" class="btn btn-primary"  onClick={onSubmit}>Sign up</button>
                </form>
                <div class="dropdown-divider"></div>
                {/* 點擊此連結切換到 Signin 表單 */}
                <Link class="dropdown-item" to="/" onClick={handleSignDropdown} >Already have an account? Sign in</Link>
                {/* <a class="dropdown-item" routerLink="/signin">Already have an account? Sign in</a> */}
                <Link class="dropdown-item disabled" to="/">Forgot password?</Link>
                </div>
            </div>
            :
            <div class="dropdown">
                <button
                class="btn btn-outline-primary dropdown-bs-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded={!isDropDownMenu2 ? true : false}
                onClick={() => setisDropDownMenu2(!isDropDownMenu2)}
                >
                Signup
                </button>
                {/* <div class={`${isDropDownMenu2 ? 'dropdown-menu' : 'dropdown-menu show'} dropdown-menu-end`}>
                <div class="d-grid m-2">
                    <button  class="btn btn-primary">Signout</button>
                </div>
                </div> */}
            </div>
            }
        </Fragment>    
    );
}
export default Signup;
