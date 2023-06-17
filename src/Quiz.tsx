import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "./redux/store"
import { increment } from './redux/counter/counterSlice'
import { useNavigate } from 'react-router-dom';

/*
This component diplays the actual quiz and it calculates the student's score and stores it in the redux store
*/

const Quiz = ( props:any ) => {

    // getting the value of the correct answers from the redux store
    const { value: correctAnswers } = useSelector((state: RootState) => state.counter)

    // this will be used to navigate the student to the Rank Screen after finishing the quiz or after time is up
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // here we are storing the current index of the displayed question and the current timer value
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(30)
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    
    // here we are switching between the colors of the correct and wrong answers
    const [colorClass, setColorClass] = useState(String)
    
    // this is used to store the word "CORRECT" or "INCORRECT"
    const [correctness, setCorrectness] = useState(String)

    // initializing the countdown timer using the useEffect and it clears the timer and start a new one for every index
    // change or for every word displayed
    useEffect(() => {
        setCurrentTime(30)
        const timer = setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1)
            }, 1000);

            return () => {
            clearInterval(timer)
            }
    }, [currentIndex])

    // this useEffect renders every second in the timer and it checks 2 things:
    // 1) if the timer has reached 0 so it increases the current displayed index by one to switch to the next word
    // 2) if the user has reached the 10th index which means they have completed the exam so then it navigates the user to
    // the Rank Screen
    useEffect(() => {
        if(currentTime <= 0 && currentIndex < 9){
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
        else if(currentTime <= 0 && currentIndex >= 9){
            navigate('/leaderboard')
        }
        // this timer has a pad of 2 "0" digits because first I made the timer countdown from 90 seconds to 0 but changed it
        // later to 30 seconds only
        setMinutes(String(Math.floor(currentTime / 60)).padStart(2, '0'))
        setSeconds(String(currentTime % 60).padStart(2, '0'))
    }, [currentTime])

    // this function runs when the user clicks on an answer and then it validates the answer,
    // if correct it increments the "correctAnswers" which is stored in the redux store using the dispatch(action) and then
    // it adds a class of "right" to the 4 answers div in the question so that the chosen answer would turn green and
    // the 4 answers would be unclickable so that the user can't change the answer during the 1 seconds delay timer that is set
    // after each answer submition and then it also sets the answer feedback message to "CORRECT".
    // if incorrect it adds a class of "wrong" to the 4 answers div in the question and also disables the click events
    // on the 4 answers for 1 second.
    const handleAnswer = (target:any) => {
        // each answer has an id of it's own POS type ( noun, adjective, adverb, verb )
        if(props.words[currentIndex].pos === target.id){
            dispatch(increment())
            setColorClass('right')
            setCorrectness(' CORRECT')
        }else{
            setColorClass('wrong')
            setCorrectness(' INCORRECT')
        }
        // here ae are setting a 1 second delay so that the user can read the answer feedback msg and see the right/wrong
        // color change before switching to the next word and it also clears the pointer events on the 4 answers div and removes
        // the class responsible for the answers color change
        setTimeout(() => {
            if(currentIndex < 9){
                setCurrentIndex((prevIndex) => prevIndex + 1)
                setCurrentTime(30)
                setColorClass('')
                setCorrectness('')
            } else {
                navigate('/leaderboard')
            }
        }, 1000)
    }

    return (
        <div className="quiz bg-white w-50 m-auto p-3 shadow rounded-ng">
            <div className="d-flex w-100">
                <div className="w-75 d-flex">
                    <div className="bar-ng main-progress-bar w-100 m-auto">
                        <div className="bar-ng sub-progress-bar" style={{width:`${(currentIndex*10)}%`}}></div>
                    </div>
                </div>
                <div className="w-25 d-flex">
                    <div className="mx-auto px-2 py-1 bg-ng text-white rounded-ng">
                        <span className="minutes fw-bold fs-5">{minutes}</span> : 
                        <span className="seconds fw-bold fs-5">{seconds}</span>
                    </div>
                </div>
            </div>
            <div className="d-flex p-3">
                <p className="text-ng m-auto fs-1 fw-bold">
                    {props.words[currentIndex].word}
                    <span className={correctness === ' CORRECT' ? 'right-span' : 'wrong-span'}>{correctness}</span>
                </p>
            </div>
            <div className={`answers ${colorClass}`}>
                <div className="d-flex w-100">
                    <input onClick={(e) => handleAnswer(e.target)} type="radio" className="btn-check" name="options-outlined" id="noun" autoComplete="off" />
                    <label className="btn btn-outline-secondary w-50 m-1 fs-5" htmlFor="noun">noun</label>

                    <input onClick={(e) => handleAnswer(e.target)} type="radio" className="btn-check" name="options-outlined" id="adjective" autoComplete="off" />
                    <label className="btn btn-outline-secondary w-50 m-1 fs-5" htmlFor="adjective">adjective</label>
                </div>
                <div className="d-flex w-100">
                    <input onClick={(e) => handleAnswer(e.target)} type="radio" className="btn-check" name="options-outlined" id="adverb" autoComplete="off" />
                    <label className="btn btn-outline-secondary w-50 m-1 fs-5" htmlFor="adverb">adverb</label>

                    <input onClick={(e) => handleAnswer(e.target)} type="radio" className="btn-check" name="options-outlined" id="verb" autoComplete="off" />
                    <label className="btn btn-outline-secondary w-50 m-1 fs-5" htmlFor="verb">verb</label>
                </div>
            </div>
            <h4 className="my-3 text-ng">Correct answers: {correctAnswers}</h4>
        </div>
    );
}
 
export default Quiz;
