import React from 'react'
import { BaseUrl } from '../BaseUrl';
import { useHistory } from 'react-router-dom';

const md5 = require('md5');


export default function Login() {

    const history = useHistory();
    async function submitHandler(e) {

        e.preventDefault();
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

        let password = md5(pass);
        let admin = await fetch(BaseUrl + 'admin/users/verifyadmin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        let result = await admin.json();

        if (admin.status === 200 && result.message == 'Verified Admin') {
            localStorage.setItem('adminName', result.result.adminName);
            localStorage.setItem('adminToken', result.result.token);
            history.push('/admin');
        }
        else alert(result.message);
    }

    return (
        <div class="authentication">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-sm-12 mt-5">
                        <form class="card auth_form" onSubmit={(e) => submitHandler(e)}>
                            <div class="header">
                                <img class="logo mt-4 mb-2" src="logo.png" alt="" />
                                <h5>Log in</h5>
                            </div>
                            <div class="body">
                                <div class="input-group mb-3">
                                    <input type="email" id="email" class="form-control" placeholder="Email" required />
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="zmdi zmdi-account-circle"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" id="password" class="form-control" placeholder="Password" required />
                                    <div class="input-group-append">
                                        <span class="input-group-text"><a href="forgot-password.html" class="forgot" title="Forgot Password"><i class="zmdi zmdi-lock"></i></a></span>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block waves-effect waves-light">SIGN IN</button>
                                <div class="signin_with mt-3">
                                    {/* <p class="mb-0">Don't have an account ?</p> */}
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="col-lg-8 col-sm-12">
                        <div class="card">
                            <img src="assets/images/signin.svg" alt="Sign In" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
