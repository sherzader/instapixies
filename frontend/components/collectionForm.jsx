var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var collectionForm = React.createClass({
  mixins: [LinkedStateMixin],

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
    var collection = this.state;

    $.ajax({
      url: "api/collections",
      type: "POST",
      success: function (query) {
        ApiActions.receiveAllUsersGroups(query);
       }
     });
  },
  fetchCollection: function () {
    $.ajax({
      url: "api/collections/" + collection.id,
      type: "GET",
      success: function (query) {
        ApiActions.receiveAllUsersGroups(query);
       }
     });
  },
  render: function(){
    return (
      <div>
      <h1>Search Instagram photos by #!</h1>
      <br>
      <form action="<%= api_collections_url %>" method="post">
        <%= auth_token %>
        <div class="form-group">
          <label for="collection_start_date">Start Date</label>
          <br>
          <input
            type="datetime-local"
            name="collection[start_date]"
            value="<%= @collection.start_date %>"
            id="collection_start_date">
        </div>
        <div class="form-group">
          <label for="user_email">End Date</label>
          <br>
          <input
            type="datetime-local"
            name="collection[end_date]"
            value="<%= @collection.end_date %>"
            id="collection_end_date">
        </div>
        <div class="form-group">
          <label for="collection_hashtag">Hashtag</label>
          <br>
          <input
            type="text"
            name="collection[hashtag]"
            value="<%= @collection.hashtag %>"
            id="collection_hashtag">
        </div>
          <input type="submit" value="Find tagged photos!">
      </form>
      <br>
      </div>
    );
  }
});

module.exports = collectionForm;
