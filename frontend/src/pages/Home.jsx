import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import VideoList from '../components/VideoList'
import Pagination from '../components/Pagination'
import { FiGrid, FiMenu } from 'react-icons/fi'

function Home() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // 'grid' ou 'list'
    const [searchParams, setSearchParams] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handleSearch = async (params) => {
        const perPage = viewMode === 'grid' ? 16 : 10
        const currentPage = params.page ?? 1

        const finalParams = {
            ...params,
            page: currentPage,
            per_page: perPage,
        }

        setSearchParams(finalParams)
        setPage(currentPage)
        setLoading(true)

        try {
            const queryString = new URLSearchParams(finalParams).toString()
            const response = await fetch(`http://localhost:8000/api/videos?${queryString}`)
            const data = await response.json()
            setVideos(data.items)
            setTotalPages(data.total_pages ?? 1)
        } catch (err) {
            console.error('Erro ao buscar vídeos:', err)
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (newPage) => {
        if (searchParams) {
            handleSearch({ ...searchParams, page: newPage })
        }
    }

    // Reexecutar busca se mudar o modo de visualização
    useEffect(() => {
        if (searchParams) handleSearch(searchParams)
    }, [viewMode])

    return (
        <div className="app">

        <SearchBar onSearch={handleSearch} />

        <div className="view-toggle">
            <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                title="Vista em grelha"
            >
                <FiGrid size={18} />
            </button>
            <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                title="Vista em lista"
            >
                <FiMenu size={18} />
            </button>
            </div>

        {loading ? (
            <p>A carregar...</p>
        ) : (
            <>
            <VideoList videos={videos} viewMode={viewMode} />
            {videos.length > 0 && (
                <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            )}
            </>
        )}
        </div>
    )
}

export default Home
