import React, { useState, useEffect } from "react";

const Try = (props) => {
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <>

        <div onClick={setIsUpdate(true)}>
        {props.name}    
        </div>

{isUpdate && <input/>}

        </>
    )
}

export default Try
