import { useSelector, useDispatch } from 'react-redux'
import { reset, name } from './redux/counter/counterSlice'
import type { RootState } from "./redux/store"
import { useEffect, useState } from 'react'
import { baseUrl } from './scripts/BaseUrl'
import { useNavigate } from 'react-router-dom'
import ScreenTransition from './scripts/ScreenTransition'
import LeaderBoard from './LeaderBoard'
import fetchData from './scripts/fetchData'

/*
The RankScreen component is where the student receives his rank, also I added a Top 10 Leader Board
for reference, after rendering the component sends a POST request to '/rank' endpoint to get the
student's rank and to store their score in the database.
This component checks if the user has a rank stored localy in useState and if is true it displays
the rank and if false it displays a button to go to the practicing component
*/

const RankScreen = () => {

    // for redirecting we use the useNavigate function instead of useHistory which was deprecated in v6
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [ userRank, setUserRank ] = useState(Number)

    // getting store data
    const { value: correctAnswers, name: username} = useSelector((state: RootState) => state.counter)

    const getData = async () => {
        const { data } = await fetchData(baseUrl('/rank'), "POST", {username, finalScore: correctAnswers}, "")
        if(data){
            setUserRank(data.studentRank)
        }
        dispatch(name(''))
        dispatch(reset())
    }

    useEffect(() => {
        ScreenTransition()
        if(username !== ''){
            getData()
        }
    }, [])

    return (
        <div className="rank-screen bg-white w-50 mx-auto my-5 p-3 shadow rounded-ng">
            { userRank > 0 ? <div className="d-flex">
                <img className="mx-auto" src="../finishing.svg" alt="YAY!!" width="300" />
            </div> : '' }
            <div className="user-rank d-flex">
                { userRank > 0 ? <div className='m-auto text-ng'><p className="h1">{`Your Rank is ${userRank}`}</p>
                <p className="h1">{`You are in the Top ${100 - userRank}%`}</p></div> : <button
                onClick={() => navigate('/')}
                className="m-auto btn btn-ng rounded-ng text-white fs-3"
                >
                    Practice Now!
                </button>}
            </div>
            { userRank > 0 ? <div className="d-flex"><button
                onClick={() => navigate('/')}
                className="m-auto btn btn-ng rounded-ng text-white fs-3"
                >
                    Practice Again
                </button></div> : '' }
            <LeaderBoard />
        </div>
    );
}
 
export default RankScreen;