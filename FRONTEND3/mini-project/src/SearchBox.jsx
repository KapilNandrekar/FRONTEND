import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

const API_URL = "https://api.tvmaze.com/shows/431/episodes";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
}

export default function SearchBox() {
    let [season, setSeason] = useState("");
    let [episodeNumber, setEpisodeNumber] = useState("");
    let [episode, setEpisode] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");

    let handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };

    let handleEpisodeChange = (e) => {
        setEpisodeNumber(e.target.value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setEpisode(null);
        setLoading(true);

        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`Request failed (${res.status})`);
            }
            const allEpisodes = await res.json();

            const seasonNum = Number(season);
            const episodeNum = Number(episodeNumber);

            const found = allEpisodes.find(
                (ep) => ep.season === seasonNum && ep.number === episodeNum
            );

            if (!found) {
                setError(`No episode found for Season ${season}, Episode ${episodeNumber}.`);
            } else {
                setEpisode(found);
            }
        } catch (err) {
            setError(err.message || "Something went wrong fetching the episode.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="SearchBox">
            <div className="SearchBox-header">
                <span className="SearchBox-eyebrow">Central Perk Archive</span>
                <h2 className="SearchBox-title">Friends Episode Explorer</h2>
                <p className="SearchBox-tagline">
                    Find out what happened, one season and episode at a time.
                </p>
            </div>

            <h3>Search for the episode:</h3>
            <form onSubmit={handleSubmit} className="SearchBox-form">
                <TextField
                    id="season"
                    label="Season Number"
                    variant="outlined"
                    type="number"
                    required
                    value={season}
                    onChange={handleSeasonChange}
                />
                <TextField
                    id="episode"
                    label="Episode Number"
                    variant="outlined"
                    type="number"
                    required
                    value={episodeNumber}
                    onChange={handleEpisodeChange}
                />
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </Button>
            </form>

            {error && (
                <p className="SearchBox-error">{error}</p>
            )}

            {episode && (
                <div className="SearchBox-result">
                    <h4>
                        S{String(episode.season).padStart(2, "0")}
                        E{String(episode.number).padStart(2, "0")}: {episode.name}
                    </h4>
                    {episode.image?.medium && (
                        <img
                            src={episode.image.medium}
                            alt={episode.name}
                            className="SearchBox-image"
                        />
                    )}
                    <p><strong>Air date:</strong> {episode.airdate}</p>
                    <p><strong>Runtime:</strong> {episode.runtime} minutes</p>
                    <p><strong>Rating:</strong> {episode.rating?.average ?? "N/A"}</p>
                    <p className="SearchBox-summary">{stripHtml(episode.summary)}</p>
                </div>
            )}
        </div>
    );
}