import { useState } from 'react'
import { FiSearch, FiFilter } from 'react-icons/fi'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')
    const [locale, setLocale] = useState([])
    const [size, setSize] = useState([])
    const [showFilters, setShowFilters] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch({
            query,
            locale: locale.join(','), 
            size: size.join(','),
            page: 1,
        })
    }

    return (
        <header className="search-header">
            <div className="search-header-content">
            <div className="logo">
                <img src="/images/pexels_logo.png" alt="Pexels" />
                <h1>Pexels</h1>
                </div>
        
                <form onSubmit={handleSubmit} className="search-form">
                    <div className="search-dropdown-wrapper">
                        <div className="input-wrapper">
                            <input type="text" placeholder="Pesquisar vídeos..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                            <button type="submit" className="search-btn"><FiSearch size={20} /></button>
                            <button type="button" className="filter-btn" onClick={() => setShowFilters(!showFilters)}><FiFilter size={20} /></button>
                        </div>
        
                        {showFilters && (
                        <div className="filters-dropdown horizontal">
                            <div className="filter-row">
                                <p><strong>Localidades:</strong></p>
                                <div className="options">
                                    {[ { label: 'Português (Brasil)', value: 'pt-BR' },{ label: 'Inglês (EUA)', value: 'en-US' },{ label: 'Espanhol (Espanha)', value: 'es-ES' }, ].map(opt => (
                                        <label key={opt.value}>
                                            <input type="checkbox" value={opt.value} checked={locale.includes(opt.value)} onChange={(e) => {
                                                const checked = e.target.checked
                                                setLocale(prev =>
                                                    checked ? [...prev, opt.value] : prev.filter(val => val !== opt.value)
                                                )
                                            }}
                                            />
                                            <span>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-row">
                                <p><strong>Resoluções:</strong></p>
                                <div className="options">
                                    {[{ label: 'HD', value: 'medium' },{ label: 'FullHD', value: 'large' },{ label: '4K', value: 'ultraHD' },].map(opt => (
                                        <label key={opt.value}>
                                            <input type="checkbox" value={opt.value} checked={size.includes(opt.value)} onChange={(e) => {
                                                const checked = e.target.checked
                                                setSize(prev =>
                                                    checked ? [...prev, opt.value] : prev.filter(val => val !== opt.value)
                                                )
                                            }}
                                            />
                                            <span>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </form>
            </div>
        </header>
    )
  
}

export default SearchBar
