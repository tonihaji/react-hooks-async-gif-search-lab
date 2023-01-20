import React, {useState, useEffect } from 'react'
import GifList from './GifList'

function GifListContainer(){

    const [gifList, setGifList] = useState([])
  

    useEffect(() => {
        fetch("https://api.giphy.com/v1/gifs/search?q=dolphin&api_key=6ofpYyZ9LjLzBtntrYiypwRbmhjlIOjS&rating=g")
        .then(res => res.json())
        .then(data=>{
            setGifList(data.data)
        }
        )
    }, [])

    return(
        <div>
            <GifList gifs={gifList}/>
        </div>
    )

}

export default GifListContainer;