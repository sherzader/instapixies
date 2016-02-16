var React = require('react');

var showCollection = React.createClass({
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
  render: function () {
    var tag = "";
    var instaitems = [];
    if (this.state.instaitems.length > 0){
      tag = this.state.hashtag;
      state_igs = this.state.instaitems;
      for (var i = state_igs.length - 20; i < state_igs.length; i++){
        var ig_item = this.state.instaitems[i];
        instaitems.push(<li key={ig_item.id}>
          <a href={ig_item.link}
             data-largesrc={ig_item.image}
             data-title={ig_item.username}
             data-description={ig_item.created_date, ig_item.created_time}>
             <img src={ig_item.image} width="306" height="306" />
          </a>
       </li>);
      }
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
            className="btn btn-lg btn-default"
            data-next-id={parseInt(this.state.next_max_tag_id)}>
            Load more
          </button>
        </p>
      </div>
    );
  }
});

module.exports = showCollection;
