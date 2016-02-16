var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var collectionForm = require('./components/collectionForm.jsx');
var showCollection = require('./components/showCollection.jsx');

var App = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={collectionForm} />
    <Route path="show/:id" component={showCollection} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('main');
  if (root){
    ReactDOM.render(<Router>{routes}</Router>, root);
  }
});
