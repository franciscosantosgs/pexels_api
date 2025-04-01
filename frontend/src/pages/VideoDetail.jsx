import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

function VideoDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    const video = location.state?.video

    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        if (!video) {
            navigate('/')
            return
        }

        const isMobile = window.innerWidth <= 768
        const quality = isMobile ? 'sd' : 'hd'

        const file = video.video_files.find(f => f.quality === quality)
        setVideoUrl(file?.link || video.video_files[0]?.link)
    }, [video, navigate])

    if (!video) return null

    const resolution = `${video.width}x${video.height}`
    const durationMin = Math.floor(video.duration / 60)
    const durationSec = String(video.duration % 60).padStart(2, '0')

    return (
        <>
        <SearchBar onSearch={(params) => {
            // Quando o utilizador pesquisar aqui, redireciona para a home com a pesquisa
            navigate('/', { state: { searchParams: params } })
        }} />

        <div className="video-detail">
            {videoUrl && (
            <video controls width="100%">
                <source src={videoUrl} type="video/mp4" />
                O seu navegador não suporta vídeo.
            </video>
            )}
            <div className="info">
            <p><strong>Autor:</strong> {video.user_name}</p>
            <p><strong>ID:</strong> {video.id}</p>
            <p><strong>Resolução:</strong> {resolution}</p>
            <p><strong>Duração:</strong> {durationMin}m {durationSec}s</p>
            <button onClick={() => navigate(-1)}>← Voltar</button>
            </div>
        </div>
        </>
    )
}

export default VideoDetail
