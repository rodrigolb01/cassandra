// import   { useStyles }   from "../App/App.style";
import './AppStyle.css';
import React from "react";

interface Props {
}

const App: React.FC<Props> = ( props ) => {
    // const style = useStyles();

    
    return (
        <div className={"app"}> 
            <button>search</button>
            <input type="text" className="input"/>
        </div>
    )
}

App.defaultProps = {
}

export default App;

