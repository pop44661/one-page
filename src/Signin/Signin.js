import './Signin.css';

import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

const Signin = (props) => {
    const {isAutheticated,handleSignDropdown,handleisAutheticated} = props
    const [isDropDownMenu1, setisDropDownMenu1] = useState(true);
    const [isDropDownMenu2, setisDropDownMenu2] = useState(true);
    const [inprogress, setinprogress] = useState(true);
    const [signinFrom, setsigninFrom] = useState({username:'',email:'',password:''});

    const navigate = useNavigate();
    const SIGNIN = 'http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com/api/v2/auth/signin';

    useEffect(() =>{
        if(isAutheticated){
            setinprogress(false)
        }
        else{
            setinprogress(true)
        }
    },[isAutheticated])

    const changeDropDown = (e) => {
        const{name,value} = e.target;
        setsigninFrom((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const onSubmit = () => {
        console.log(signinFrom)
        axios.post(SIGNIN,JSON.stringify(signinFrom),{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
        })
        .then(
            (response) => {
                try{
                    if(!JSON.parse(response.data).err){
                        localStorage.setItem('role', JSON.stringify(JSON.parse(response.data).role));
                        handleisAutheticated(true);
                        setisDropDownMenu2(true)
                    }
                    else{
                        alert("Input error")
                    }
                    
                    navigate("/model-examples", { replace: true })
                }
                catch{
                    
                }
            }
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

    const signOut = () => {
        setinprogress(true)
        setsigninFrom({
            username:'',
            email:'',
            password:''
        })
        handleisAutheticated(false)
        navigate("/", { replace: true })
    }

    return(
        <Fragment>
            {inprogress ?
            <div class="dropdown" >
                <button
                    class="btn btn-outline-primary dropdown-bs-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={!isDropDownMenu1 ? true : false}
                    data-bs-display="static"
                    disabled={!inprogress}
                    onClick={() => setisDropDownMenu1(!isDropDownMenu1)}
                >
                    Signin
                </button>
                <div class={`${isDropDownMenu1 ? '' : 'show'} dropdown-menu dropdown-menu-end dropdown-menu-width`}>
                    <form  class="px-4 py-3">
                    <div class="mb-3">
                        <label for="exampleDropdownFormUsername1" class="form-label">Username</label>
                        <input
                        name="username"
                        type="text"
                        class="form-control"
                        id="exampleDropdownFormUsername1"
                        placeholder="username"
                        value={signinFrom.username}
                        onChange={(e) => changeDropDown(e)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
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
                        <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
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
                        <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                        <label class="form-check-label" for="dropdownCheck">
                            Remember me
                        </label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={onSubmit}>Sign in</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" to="/#" onClick={handleSignDropdown}>New around here? Sign up</Link>
                    <Link class="dropdown-item disabled" href="#">Forgot password?</Link>
                </div>
            </div>
            :
            <div class="dropdown" >
                <button
                    class="btn btn-outline-primary dropdown-bs-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={!isDropDownMenu2 ? true : false}
                    onClick={() => setisDropDownMenu2(!isDropDownMenu2)}
                >
                    {signinFrom.username}
                </button>
                <div class={`${isDropDownMenu2 ? '' : 'show'} dropdown-menu dropdown-menu-end`}>
                    <div class="d-grid m-2">
                    <button onClick={signOut} class="btn btn-primary">Signout</button>
                    </div>
                </div>
            </div>
            }
        </Fragment>    
    );
}


export default Signin;