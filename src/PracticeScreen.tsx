import { useEffect, useState } from "react";
import ScreenTransition from './scripts/ScreenTransition'
import { baseUrl } from "./scripts/BaseUrl";
import Quiz from "./Quiz";
import { useDispatch } from 'react-redux'
import { name, reset } from './redux/counter/counterSlice'
import fetchData from "./scripts/fetchData";

/*
The PracticeScreen component works with 2 views the first one is the form which asks the student to enter their
name and the second view is the quiz itself
*/


const PracticeScreen = () => {

    // storing the dispatch function to use it fr storing the student's name in the redux store
    const dispatch = useDispatch()

    const [ username, setUsername ] = useState('')
    const [ words , setWords ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const [ error, setError ] = useState(String)

    const handleGetWords = async (e:any) => {
        e.preventDefault()
        setIsPending(true)
        dispatch(name(username))
        dispatch(reset())

        // this fetchData function is reusable and the parameters are ( url, method, body, token)
        const { data, isPending, error } = await fetchData(baseUrl('/words'), "GET", "", "")
        setWords(data)
        setIsPending(isPending)
        setError(error)
    }

    useEffect(() => {
        // the ScreenTransition function is used to create a transition effect between component renders
        // it is provided from the gsap library which is used for easy dom manipulation using timeline animations
        ScreenTransition()
    }, [words])

    return (
        <div className="practice-screen p-5">
            { !words && <div className="bg-white w-50 m-auto p-3 shadow rounded-ng">
                <div className="d-flex">
                    <img className="mx-auto" src="../practice.svg" alt="Practice!!" width="300" />
                    <h1 className="m-auto">
                        <p className="m-0 text-ng">PRACTICE</p>
                        <p className="m-0 text-ng">YOUR</p>
                        <p className="m-0 text-ng">PART</p>
                        <p className="m-0 text-ng">OF</p>
                        <p className="m-0 text-ng">SPEECH</p>
                    </h1>
                </div>
                <form onSubmit={handleGetWords}>
                    <div className="d-flex nagwa-center">
                        <div className="m-2">
                            <label htmlFor="exampleFormControlInput2" className="form-label m-1">Name</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control rounded-ng" id="exampleFormControlInput2" required />
                        </div>
                    </div>
                    <div className="m-2 d-flex">
                        { !isPending && <button type="submit" className="fs-5 btn btn-ng rounded-ng text-white m-auto">Start Practicing!</button> }
                        { isPending && <button className="fs-5 btn btn-ng rounded-ng text-white m-auto" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Start Practicing!
                        </button> }
                    </div>
                </form>
            </div> }
            { words && <Quiz words={words} />}
        </div>
    );
}
 
export default PracticeScreen;