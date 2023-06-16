import { useState } from "react";
import fetchData from "./scripts/fetchData";
import { baseUrl } from "./scripts/BaseUrl";
import { useSelector } from 'react-redux'
import type { RootState } from "./redux/store"

const CreateNewWord = () => {

    const { token } = useSelector((state: RootState) => state.counter)

    const [ word, setWord ] = useState(String)
    const [ pos, setPos ] = useState(String)
    const [ dataCreated, setDataCreated ] = useState(Boolean)

    const handleCreate = async (e:any) => {
        e.preventDefault()
        const { data } = await fetchData(baseUrl('/create'), 'POST', { word, pos }, token)
        if(data !== ''){
            console.log(data)
            setDataCreated(true)
        }
    }

    return (
        <div className="create">
            <h1 className="text-ng fw-bold d-flex">
                <p className="m-auto">Create New Word</p>
            </h1>
            
            <form className="w-50 m-auto p-3 ltr" onSubmit={handleCreate}>
                <div className="m-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label m-1">Name</label>
                    <input type="text" value={word} onChange={(e) => setWord(e.target.value)} className="form-control rounded-ng" id="exampleFormControlInput1" required />
                </div>
                <div className="p-2">
                    <select className="form-select rounded-ng" value={pos} onChange={(e) => setPos(e.target.value)} aria-label="Default select example">
                        <option selected>Select POS</option>
                        <option value="noun">Noun</option>
                        <option value="adjective">Adjective</option>
                        <option value="adverb">Adverb</option>
                        <option value="verb">Verb</option>
                    </select>
                </div>
                <div className="d-flex">
                    <input type="submit" value="Create" className="btn btn-ng rounded-ng w-75 my-2 mx-auto text-white" />
                </div>
            </form>
            { dataCreated && <div className="d-flex">
                <div className="w-50 alert m-auto alert-primary d-flex" role="alert">
                        <p className="m-auto">
                            Word Created
                        </p>
                    </div>
            </div> }
        </div>
    );
}
 
export default CreateNewWord;