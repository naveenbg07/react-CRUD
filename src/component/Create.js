
import React, {createRef,useState,useEffect} from "react";
import { toast } from 'react-toastify'

const url = 'http://localhost:4500'


function Create(props){
    const rName = createRef()
    const rEmail = createRef()
    const rMobile = createRef()

    const [validate,setValidate] = useState(false)
    const [users,setUsers] = useState([])

    const readUsers = async () => {
        await fetch(`${url}/users`)
        .then(res => res.json())
        .then(out => {
            setUsers(out)
        }).catch(err => toast.error(err.message))
    }

    //executes on component mount
    useEffect(()=>{
        readUsers()
    },[])



    const clearForm = () => {
        rName.current.value = "";
        rEmail.current.value = "";
        rMobile.current.value = "";
    }

    const validateUser = async (user) => {
     
        let extEmail = users.find((item) => item.email === user.email)
        let extMobile = users.find((item) => item.mobile === user.mobile)


            if(extEmail){
                toast.error("Email already registered");
                clearForm()
                setValidate(false)

            }else if(extMobile){
                toast.error("Mobile number already registered");
                clearForm()
                setValidate(false)
            }else {
                setValidate(true)
            }

        
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const user = {
                name: rName.current.value,
                email: rEmail.current.value,
                mobile: rMobile.current.value,
            };

            console.log('final data=', user);
            validateUser(user);

            if(validate === true){
                await fetch(`${url}/users`,{
                    method:'POST',
                    body:JSON.stringify(user),
                    redirect:'follow',
                    headers:{
                        'Content-type': 'application/json'
                    }

                }).then(res => res.json())
                .then(out=>{
                    toast.success("New user created successfully")
                    clearForm()

                }).catch(err => toast.error(err.message));
            }
        } catch (err){
            toast.error(err.message)
        }
    }

    return (
<div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <u><h3 className="display-3 text-primary">Create</h3></u>
        </div>
    </div>

<div className="row">
<div className="col-md-6 offset-md-3">
    <div className="card">
        <div className="card-body">
            <form onSubmit={submitHandler} autoComplete={'off'}>
                <div className="form-group mt-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={rName} className="form-control" required />
                </div>

    <div className="form-group mt-2">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={rEmail} className="form-control" required />
    </div>

    <div className="form-group mt-2">
        <label htmlFor="mobile">Mobile</label>
        <input type="number" name="mobile" id="mobile" ref={rMobile} className="form-control" required />

    <div className="form-group mt-2">
        <input type="submit" value="create user" className="btn btn-success"/>
        <button onClick={clearForm} className="btn btn-warning float-end">Clear</button>
    </div>
         </div>
            </form>
               </div>
                  </div>

                    </div>
                      </div>
                         </div>
)
}
export default Create