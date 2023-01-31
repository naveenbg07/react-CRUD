import React, {useState,  useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const url = 'http://localhost:4500'




function Edit(props){
    const params = useParams();
    const [user, setUser] = useState({
        name:"",
        email:"",
        mobile:""

    })

    const navigate = useNavigate()

    const readSingleUser = async () => {
        await fetch(`${url}/users/${params.id}`)
        .then(res => res.json())
        .then(out =>{
            setUser(out)
        }).catch(err => toast.error(err.message))

    }

    useEffect(()=>{
        readSingleUser()
    },[])

    //to set the updated value back to state
    const readValue =(e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    //submit handler
    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            console.log('user =', user)
            fetch(`${url}/users/${params.id}`,{
                method:'PATCH',
                body:JSON.stringify(user),
                headers:{
                    'content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(out => {
                toast.success("successfully updated")
                navigate(`/`)
            })
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Edit={params.id}</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                    <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="form-group mt-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={user.name} onChange={readValue} id="name" className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={user.email} onChange={readValue} id="email" className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" name="mobile" value={user.mobile} onChange={readValue} id="mobile" className="form-control" required />
                        </div>

                        <div className="form-group mt-2">
                            <input type="submit" value="update" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
         </div>
     </div>
 </div>
    )
}
export default Edit