import { useEffect, useState } from "react";
import ScreenTransition from "./scripts/ScreenTransition";
import { baseUrl } from "./scripts/BaseUrl";
import fetchData from "./scripts/fetchData";
import CreateNewWord from "./CreateNewWord";
import { setToken } from './redux/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "./redux/store"

/*
This component switches between displaying the admin login form and the create new word form
according to the token state in the redux store, so if the token exist then the user can send
a create word request and include the token in the headers but if token doesn't exist user
must login first
*/

const Login = () => {

    const { token } = useSelector((state: RootState) => state.counter)

    const dispatch = useDispatch()

    const [ username, setUsername ] = useState(String)
    const [ password, setPassword ] = useState(String)

    const handleLogin = async (e:any) => {
        e.preventDefault()
        const { data } = await fetchData(baseUrl('/login'), "POST", { username, password }, '')
        if(data){
            console.log(data)
            dispatch(setToken(data.token))
        }
    }

    useEffect(() => {
        ScreenTransition()
    }, [token])

    return (
        <div className="login bg-white w-50 m-auto p-3 mt-5 shadow rounded-ng">
            { token === '' && <>
            <div className="alert alert-danger" role="alert">
                You have to log in as Admin to add new words, (username = nagwa) (password = 123)
            </div>
            <form className="w-50 m-auto p-3 ltr" onSubmit={handleLogin}>
                <div className="m-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label m-1">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control rounded-ng" id="exampleFormControlInput1" required />
                </div>
                <div className="m-2">
                    <label htmlFor="exampleFormControlInput2" className="form-label m-1">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control rounded-ng" id="exampleFormControlInput2" required />
                </div>
                <div className="d-flex">
                    <input type="submit" value="Login" className="btn btn-ng rounded-ng w-75 my-2 mx-auto text-white" />
                </div>
            </form>
            </>}
            { token !== '' && <CreateNewWord />}
        </div>
    );
}
 
export default Login;