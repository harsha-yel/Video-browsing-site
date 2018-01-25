import  React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
//create a component
const API_KEY = 'AIzaSyAKWnnUjoCPTnYEwGum2SM5GvVttXwqYPM';


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }
        videoSearch(term) {
            YTSearch({key: API_KEY, term: term}, (videos) => {
                this.setState({
                    videos: videos,
                    selectedVideo: videos[0]
                });
                //this.setState({videos:videos});
            });
        }

    render(){

        const videoSearch = _.debounce(term =>{this.videoSearch(term)}, 300);
        
        return (<div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} ></VideoDetail>
            <VideoList
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}/>
        </div>);
    }
}

//render the component
ReactDOM.render(<App />, document.querySelector('.container'));