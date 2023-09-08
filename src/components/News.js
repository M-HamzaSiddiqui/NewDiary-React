import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadSpinner from './LoadSpinner';

const News = (props) => {
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        // props.setProgress(50);

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])
    

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
        return (
            <>
                <h1 className="text-center" style={{ margin: '90px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    style={{overflow:"hidden" }} //To put endMessage and loader to the top. //
                    hasMore={articles.length !== totalResults}
                    // loader={hasMore&&<LoadSpinner/>}
                    scrollableTarget="scrollableDiv"
                >
                <div className="container">

                    <div className="row">

                        {articles?.map((element) => {
                            return <div className="col-md-4" key={Math.random()}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}
                        {loading && <LoadSpinner />}
                    </div>
                </div>
                </InfiniteScroll>

            </>
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 7,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News