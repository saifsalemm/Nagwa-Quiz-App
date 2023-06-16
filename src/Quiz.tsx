import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "./redux/store"
import { increment } from './redux/counter/counterSlice'
import { useNavigate } from 'react-router-dom';

const Quiz = ( props:any ) => {

    const { value: correctAnswers } = useSelector((state: RootState) => state.counter)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(30)
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [colorClass, setColorClass] = useState(String)
    const [correctness, setCorrectness] = useState(String)

    useEffect(() => {
        setCurrentTime(30)
        const timer = setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1)
            }, 1000);

            return () => {
            clearInterval(timer)
            }
    }, [currentIndex])

    useEffect(() => {
        if(currentTime <= 0 && currentIndex < 9){
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
        else if(currentTime <= 0 && currentIndex >= 9){
            navigate('/leaderboard')
        }
        setMinutes(String(Math.floor(currentTime / 60)).padStart(2, '0'))
        setSeconds(String(currentTime % 60).padStart(2, '0'))
    }, [currentTime])


    const handleAnswer = (target:any) => {
        if(props.words[currentIndex].pos === target.id){
            dispatch(increment())
            setColorClass('right')
            setCorrectness(' CORRECT')
        }else{
            setColorClass('wrong')
            setCorrectness(' INCORRECT')
        }
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