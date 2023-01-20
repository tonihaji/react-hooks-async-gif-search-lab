import React from "react";

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
        fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=kzLvC7ErZLHViSMAmFRYtjtgRifdSYhZ&rating=g`)
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