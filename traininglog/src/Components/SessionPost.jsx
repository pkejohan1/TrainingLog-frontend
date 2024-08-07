import React from "react";  

function SessionPost(props) {


    return (
        <div className="session-post-container" onClick={props.onClick}>
            <div className="content">
                <header>
                    {props.title}
                    
                </header>
                <div className="details">
                    <div>
                        Volume
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        {props.date}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionPost;