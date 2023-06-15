import "./Loading.css"
import loading from '../../../assets/loading.svg'

function Loading(){

    return (
        <div className="loader_container">
            <img className="loader" src={loading} alt="Loading"/>
        </div>
    )
}

export default Loading