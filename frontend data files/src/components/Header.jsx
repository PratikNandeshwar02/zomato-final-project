
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const Header = (props) => {

    let  onSuccess= (credentialResponse) => {
        console.log(credentialResponse);
        let token = credentialResponse.credential;
        try{
            let data = jwt_decode(token); // to store in database we collect from here
            console.log(data);
            // save data in browser
            localStorage.setItem('zomato_oauth_token', token);
            // reload page
            alert("Login Successfully, Welcome to Zomato !")
            window.location.assign('/');
        }catch(err){
            console.log(err);
            // remove data from local storage
            localStorage.removeItem('zomato_oauth_token')
        }
    }
    let  onError= () => {
        console.log('Login Failed');
    }

    let logOut = () => {
        let isLogout = window.confirm("Are you sure to logout");
        if(isLogout){
            localStorage.removeItem("zomato_oauth_token");
            window.location.reload("/");
        }
    }

    return ( 
        <>  
                <div className="col-lg-10 col-12 d-flex justify-content-between align-items-center py-2">
                    { props.logo === false ? <p ></p> : <span className="brand-logo">e!</span> }
                    
                    {
                        props.user ? 
                        (
                            <div>
                                <button className='btn btn-outline-light'>  WelCome, {props.user.given_name} </button>
                                <button className='btn btn-danger mx-3 btn-outline-dark ' onClick={logOut}>Logout</button>
                            </div>
                        ) 
                        :
                        (
                            <button className="btn text-white btn-outline-success"
                                data-bs-toggle="modal" data-bs-target="#login-sign-up">Login/SignUp
                            </button>
                        )
                    }

                    
                </div>

            
                <div className="modal fade"
                    id="login-sign-up" tabIndex="-1"
                    aria-labelledby="modalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5"
                                    id="modalLabel"
                                >Login/Sign Up</h1>
                                <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                            <GoogleOAuthProvider clientId="621907865424-fu9qhigc2816jjefvvfo34obik0gqq1k.apps.googleusercontent.com">
                                <GoogleLogin onSuccess={onSuccess} onError={onError}/>
                            </GoogleOAuthProvider>
                            </div>
                        </div>
                    </div>

                </div>
        </>
    )
}
export default Header;