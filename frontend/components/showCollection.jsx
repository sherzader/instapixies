var React = require('react');
var ReactDOM = require('react-dom');
var History = require('react-router').History;

var showCollection = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return ({ instaitems: [] , hashtag: "", next_max_tag_id: "" });
  },
  componentWillMount: function () {
    var that = this;

    $.ajax({
      url: "api/collections/" + this.props.params.id,
      type: "GET",
      success: function (payload) {
        that.setState({
         instaitems: payload.instaitems,
         hashtag: payload.hashtag,
         next_max_tag_id: payload.next_max_tag_id
        });
      }
    });
  },
  updateCollection: function () {
    var that = this;

    $.ajax({
      url: "api/collections/" + this.props.params.id,
      type: "PATCH",
      success: function (payload) {
        that.setState({
         instaitems: payload.instaitems
        });
      }
    });
  },
  returnToNewForm: function () {
    this.history.push('/');
  },
  toggleVideo: function (ig) {
    var vid = ReactDOM.findDOMNode(this.refs.video);
    vid.play();
  },
  render: function () {
    var that = this;
    var tag = "";

    if (this.state.instaitems.length > 0){
      tag = this.state.hashtag;
      var instaitems = this.state.instaitems.map( function (ig_item){
        if (ig_item.media_type == "image") {
          return(
            <li key={ig_item.id}>
            <div link={ig_item.link}
               data-largesrc={ig_item.image}
               data-title={ig_item.username}
               data-description={ig_item.created_date, ig_item.created_time}>
             </div>
             <img src={ig_item.image} width="306" height="306" alt="instagram" />
            </li>);
        }else {
          var boundToggle = that.toggleVideo.bind(null, ig_item);
          return(
            <li key={ig_item.id}>
            <div link={ig_item.link}
               data-largesrc={ig_item.image}
               data-title={ig_item.username}
               data-description={ig_item.created_date, ig_item.created_time}>
             </div>
               <video src={ig_item.image} autoPlay></video>
            </li>);
        }
      });
    }

    return (
      <div>
        <h1>Collections for #{this.state.hashtag}</h1>
        <ul id="og-grid" className="og-grid">
          {instaitems}
        </ul>
        <p id="centerButton">
          <button
            id="loadmore"
            onClick={this.updateCollection}
            className="btn btn-lg btn-default">
            Load more
          </button>
          <button
            id="newcollec"
            onClick={this.returnToNewForm}
            className="btn btn-lg btn-default">
            New Collection
          </button>
        </p>
      </div>
    );
  }
});

module.exports = showCollection;
