var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var collectionForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    start_date: '',
    end_date: '',
    hashtag: ''
  },

  getInitialState: function () {
    return this.blankAttrs;
  },
  createCollection: function (e) {
    e.preventDefault();
    var that = this;

    $.ajax({
      url: "api/collections",
      type: "POST",
      data: { collection: this.state },
      success: function (payload) {
        that.history.push("/show/" + payload.id);
      }
     });

    this.setState(this.blankAttrs);
  },
  render: function(){
    return (
      <div>
      <h1>Search Instagram photos by #!</h1>
      <br />
      <form onSubmit={this.createCollection}>
        <div className="form-group">
          <label htmlFor="collection_start_date">Start Date</label>
          <br />
          <input
            type="datetime-local"
            valueLink={this.linkState("start_date")}
            id="collection_start_date" />
        </div>
        <div className="form-group">
          <label htmlFor="collection_end_date">End Date</label>
            <br />
          <input
            type="datetime-local"
            valueLink={this.linkState("end_date")}
            id="collection_end_date" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="collection_hashtag">Hashtag</label>
          <input
            type="text"
            valueLink={this.linkState("hashtag")}
            id="collection_hashtag" />
        </div>
          <input type="submit" value="Find tagged photos!" />
      </form>
      <br />
      </div>
    );
  }
});

module.exports = collectionForm;