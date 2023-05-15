import React from 'react'

const CurrentUrl = () => {
    const currentUrl = window.location.href;
    return (
        <div>
            <p>{currentUrl}</p>
        </div>
    )
}

export default CurrentUrl