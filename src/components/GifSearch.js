import React from "react";

// The GifSearch component will render a form that receives the user input for the Giphy search. The text input should be a controlled component that stores the value of the input in its component state and renders the DOM accordingly. The React component is always in charge of what the DOM looks like.

// GifSearch should receive a callback prop from its parent. On a submit event, it should invoke that callback prop with the value of the text input. It is this callback function, defined in GifListContainer, that will actually query the API with the text the user has entered.

function GifSearch() {
    const [search, setSearch] = React.useState("")
    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const [error, setError] = React.useState(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [gifs, setGifs] = React.useState([])

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSearchTerm(search)
    }

    React.useEffect(() => {
        fetch(`https://api.giphy.com/v1/gifs/search?q=dolphin&api_key=mXbVJWdsavXQBpM9iya2HWLyFrRe439y&rating=g`)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setGifs(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }
    , [searchTerm])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={handleChange} />
                <input type="submit" value="Search" />
            </form>
            <ul>
                {gifs.map(gif => (
                    <li key={gif.id}>
                        <img src={gif.images.original.url} alt="gif" />
                    </li>
                ))}
            </ul>
        </div>

    );
    }

export default GifSearch;