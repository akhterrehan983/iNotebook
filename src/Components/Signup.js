import React, { useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import NoteContext from '../ContextApi/NoteContext'

const Signup = () => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const {signup} = context;
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);        
        const status = await signup(formProps);
        if (status){
            navigate('/login');
        }
    }
    return (
        <>
            <div className="container my-3">
                <h1 style={{ 'textAlign': 'center' }}>Login Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" required />
                        
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" minlength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
