function Pagination({ page, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (page > 1) onPageChange(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1)
    }

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 1}>Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages}>Seguinte</button>
        </div>
    )
}
  
export default Pagination
  