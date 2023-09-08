import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        const { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{zIndex:1, left:"90%"}}>{source.name}</span>
                    <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2023/09/stocks5-770x433.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small class="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>

                        <a href={newsUrl}  rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem