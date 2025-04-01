import { useNavigate } from 'react-router-dom'

function VideoCard({ video }) {
    const navigate = useNavigate()
    const thumbnail = video.video_pictures[0]?.picture
    const durationMin = Math.floor(video.duration / 60)
    const durationSec = String(video.duration % 60).padStart(2, '0')

    const handleClick = () => {
        navigate(`/video/${video.id}`, { state: { video } })
    }

    return (
        <div className="video-card" onClick={handleClick}>
        <div className="thumbnail">
            <img src={thumbnail} alt={`Vídeo ${video.id}`} />
        </div>
        <div className="info">
            <p><strong>ID:</strong> {video.id}</p>
            <p><strong>Autor:</strong> {video.user_name}</p>
            <p><strong>Duração:</strong> {durationMin}m {durationSec}s</p>
        </div>
        </div>
    )
}

export default VideoCard
