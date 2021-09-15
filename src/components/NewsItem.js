import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, date, sourceName} = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="Failed to load" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: '1', left: '95%'}}>
                            {sourceName}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                        {sourceName}
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By- {author === null ? 'Unknown' : author} on {date}</small></p>
                        <a href={url} target='_blank' rel='noreferrer' className="btn btn-dark">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}
