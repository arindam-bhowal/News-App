import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        pageSize: 6,
        country: 'in',
        category: 'general',
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log('This is a constructor from news component');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5a1f83693f74ce39dec0ee60765d5a3&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    async componentDidMount() {
        this.updateNews();
    }



    handleNextClick = async () => {

        this.setState({page: this.state.page+1});
        this.updateNews();

        // if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
        //     console.log('Next Button was clicked');
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5a1f83693f74ce39dec0ee60765d5a3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`

        //     this.setState({ loading: true });

        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     });
        // }
    }
    handlePrevClick = async () => {

        this.setState({page: this.state.page-1});
        this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5a1f83693f74ce39dec0ee60765d5a3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

        // this.setState({ loading: true });

        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // });
    }


    render() {
        return (
            <>
                <div className="container">
                    <h2 className='mb-3 my-3' style={{ textAlign: 'center' }}>NewsMonkey- Top headlines here</h2>

                    {this.state.loading && <Loader />}

                    <div className="row">

                        {!this.state.loading && this.state.articles.map((item) => {
                            return (
                                <div className="col-md-4" key={item.url}>
                                    <NewsItem title={item.title} description={item.description} imageUrl={item.urlToImage === null ? 'https://thumbs.dreamstime.com/b/circle-rotating-globe-breaking-news-background-k-65547785.jpg' : item.urlToImage} url={item.url} author= {item.author} date= {item.publishedAt} sourceName={item.source.name} />
                                </div>
                            )
                        })}


                    </div>
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mb-2 my-2" onClick={this.handlePrevClick}>&larr; Previous</button>

                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mb-2 my-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}
