import "./EpisodeCard.css";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
}

export default function EpisodeCard({ episode }) {
    return (
        <div className="EpisodeCard">
            {episode.image?.medium && (
                <img
                    src={episode.image.medium}
                    alt={episode.name}
                    className="EpisodeCard-image"
                />
            )}
            <div className="EpisodeCard-body">
                <h4 className="EpisodeCard-title">
                    S{String(episode.season).padStart(2, "0")}
                    E{String(episode.number).padStart(2, "0")}: {episode.name}
                </h4>
                <p className="EpisodeCard-meta">
                    <strong>Air date:</strong> {episode.airdate} &nbsp;·&nbsp;
                    <strong>Runtime:</strong> {episode.runtime} min
                </p>
                <p className="EpisodeCard-summary">{stripHtml(episode.summary)}</p>
            </div>
        </div>
    );
}