import React from 'react'
import { BaseUrl } from '../BaseUrl';
import { useHistory } from 'react-router-dom';

const md5 = require('md5');

export default function Signup() {

    const history = useHistory();

    async function submitHandler(e) {

        e.preventDefault();

        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

        console.log(firstname, lastname, email, pass);

        let password = md5(pass);
        let admin = await fetch(BaseUrl + 'admin/users/addadmin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password })
        });

        if (admin.status === 200) {
            var result = await admin.json();
            localStorage.setItem('adminName', result.adminName)
            localStorage.setItem('adminToken', result.token)
            history.push('/admin');
        }
        else {
            alert(result.message)
        }
    }

    return (
        <>
            <div class="authentication">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-sm-12 mt-4">
                            <form class="card auth_form" onSubmit={(e) => submitHandler(e)}>
                                <div class="header mt-4">
                                    <img class="logo mb-2" src="logo.png" alt="" />
                                    <h5>Sign Up</h5>
                                    <span>Register a new membership</span>
                                </div>
                                <div class="body">
                                    <div class="input-group mb-3">
                                        <input type="text" id="firstname" class="form-control" placeholder="Firstname" required />
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="zmdi zmdi-account-circle"></i></span>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" id="lastname" class="form-control" placeholder="Lastname" required />
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="zmdi zmdi-account-circle"></i></span>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="email" id="email" class="form-control" placeholder="Enter Email" required />
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="zmdi zmdi-email"></i></span>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="password" id="password" class="form-control" placeholder="Password" required />
                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="zmdi zmdi-lock"></i></span>
                                        </div>
                                    </div>
                                    <div class="checkbox">
                                        <input id="remember_me" type="checkbox" />
                                        <label for="remember_me">I read and agree to the <a href="javascript:void(0);" >terms of usage</a></label>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block waves-effect waves-light">SIGN UP</button>
                                    <div class="signin_with mt-3">
                                        <a class="link" href="sign-in.html">You already have a membership?</a>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div class="col-lg-8 col-sm-12">
                            <div class="card">
                                <img src="assets/images/signup.svg" alt="Sign Up" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
