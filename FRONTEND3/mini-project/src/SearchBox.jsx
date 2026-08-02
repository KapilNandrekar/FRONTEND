import "./SearchBox.css";
import { useState, useEffect } from "react";
import EpisodeCard from "./EpisodeCard.jsx";

const API_URL = "https://api.tvmaze.com/shows/431/episodes";

export default function SearchBox() {
    const [episodes, setEpisodes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchEpisodes() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(API_URL);
                if (!res.ok) {
                    throw new Error(`Request failed (${res.status})`);
                }
                const data = await res.json();
                setEpisodes(data);
            } catch (err) {
                setError(err.message || "Something went wrong fetching episodes.");
            } finally {
                setLoading(false);
            }
        }
        fetchEpisodes();
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(inputValue);
    };

    const filteredEpisodes = episodes.filter((ep) =>
        ep.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="SearchBox">
            <div className="SearchBox-header">
                <span className="SearchBox-eyebrow">Central Perk Archive</span>
                <h2 className="SearchBox-title">Friends Episode Explorer</h2>
                <p className="SearchBox-tagline">Browse every episode, or search by name.</p>
            </div>

            <form className="SearchBox-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="SearchBox-input"
                    placeholder="Search episodes by name..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit" className="SearchBox-button">
                    Search
                </button>
            </form>

            {loading && <p className="SearchBox-status">Loading episodes...</p>}
            {error && <p className="SearchBox-error">{error}</p>}

            {!loading && !error && (
                <>
                    <p className="SearchBox-count">
                        {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="SearchBox-grid">
                        {filteredEpisodes.map((ep) => (
                            <EpisodeCard key={ep.id} episode={ep} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}