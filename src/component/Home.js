import React,{useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const url = 'http://localhost:4500'


function Home(props){
    const [users, setUsers] = useState([])

    const readUsers =async () => {
        await fetch(`${url}/users`)
        .then(res => res.json())
        .then(out => {
            setUsers(out)
        }).catch(err => toast.error(err.message))
    }

    const initFetch = useCallback(() =>{
        readUsers()
    },[readUsers])

    useEffect(()=>{
        initFetch()
    },[initFetch])

    //delete user
    const delUser = async (id) => {
        if(window.confirm(`Do you want to delete user id = ${id}?`)){
            await fetch(`${url}/users/${id}`, {
                method:"DELETE",
                headers: {
                    'content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(out =>{
                toast.success('user deleted successfully');
                //window.location.reload()
            }).catch(err => toast.error(err.message))
        } else {
            toast.warning('delete terminated')
        }
    }
    return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-success">Home</h3>
                    </div>
                </div>

                <div className="row">
                    {
                        users.length > 0 ? (
                            <React.Fragment>
                                {
                                    users.map(function(item,index){
                                        return(
                                            <div className="col-md-3 mt-2" key={index}>
                                                <div className="card">
                                                    <div className="card-header">
                                                    <h4 className="text-center">{item.name}</h4>
                                                    </div>

                                                    <div className="card-body">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <strong>Email</strong>
                                                                <span className="float-end">{item.email}</span>
                                                            </li>

                                                            <li className="list-group-item">
                                                                <strong>Mobile</strong>
                                                                <span className="float-end">{item.mobile}</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="card-footer">
                                                        <NavLink to={`/edit/${item.id}`} className="btn btn-info">Edit</NavLink>
                                                        <button onClick={() => delUser(item.id)} className="btn btn-danger float-end">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </React.Fragment>
                        ):(
                            <div className="col-md-12 text-center">
                                    <h3 className="display-3 text-secondary">No users found</h3>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
export default Home