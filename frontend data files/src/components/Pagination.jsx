import React from 'react'

const Pagination = (props) => {

    let {totalRestaurant, restaurantPerPage, setCurrentPage, currentPage} = props;

    let pages = [];

    for(let i = 1; i<= Math.ceil(totalRestaurant/restaurantPerPage); i++){
        pages.push(i);
    };

  return (
        <div className="col-12 d-flex justify-content-center align-items-center">   
            {
                pages.map((page, index) => {
                    return (
                        <button key={index} id="pagination"
                            onClick={()=> setCurrentPage(page)} 
                            className={page == currentPage ? 'active' : "" }

                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    )
};

export default Pagination;