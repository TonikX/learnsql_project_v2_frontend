import React from 'react'
import classNames from 'classnames'
import { useStyles } from './Pagination.styles'

export default ({pagesArray, currentPage, nextPage, prevPage, setPage}) => {
    const classes = useStyles()

    return (
        <div className={classes.pages}>
            <span className={classes.page} onClick={prevPage}>пред</span>
            {pagesArray.map(p =>
                <span className={currentPage === p ? classNames(classes.page, classes.activePage) : classes.page}
                      onClick={ () => { setPage(p) }}
                      key={p}>
                        {p}
                </span>)}
            <span className={classes.page} onClick={nextPage}>след</span>
        </div>
    )
}