export default function Pagination({currentPage , setCurrentPage, totalPages}: any) {
    return (
        <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation">
          <ul className="inline-flex space-x-2">
            <li>
              <button
                onClick={() => setCurrentPage((prevPage: number) => prevPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-400 text-gray-700 rounded-l-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-2 ${index+1} ${currentPage}  ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage((prevPage: number) => prevPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-400 text-gray-700 rounded-r-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
}