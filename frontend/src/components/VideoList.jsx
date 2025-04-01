import VideoCard from './VideoCard'

function VideoList({ videos, viewMode }) {
    if (videos.length === 0) return <p>Nenhum vídeo encontrado.</p>

    return (
        <div className={`video-list ${viewMode}`}>
        {videos.map(video => (
            <VideoCard key={video.id} video={video} />
        ))}
        </div>
    )
}

export default VideoList