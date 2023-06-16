import { baseUrl } from "./scripts/BaseUrl";
import fetchData from "./scripts/fetchData";
import { useEffect, useState } from "react";

/*
This component is used to display the Top 10 Leader Board on the Rank page, it fetches the Top 10
records in the scoresList from the database
*/

const LeaderBoard = () => {

    const [ scoresList, setData ] = useState(Array<any>)
    const [ isPending, setIsPending ] = useState(false)
    const [ error, setError ] = useState(String)

    const getData = async () => {
        const { data: scoresList, isPending, error } = await fetchData(baseUrl('/rank'), "GET", "", "")
        console.log(scoresList)
        setData(scoresList)
        setIsPending(isPending)
        setError(error)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="leaderboard">
            <h1 className="my-3 p-2 text-ng fs-2">
                Leader Board
            </h1>
            { !isPending && <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    { scoresList !== null ? scoresList.map((userData:any, index:any) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                            <td>{userData.name}</td>
                            <td>{userData.score} %</td>
                        </tr>
                    )) : '' }
                </tbody>
            </table> }
        </div>
    );
}
 
export default LeaderBoard;