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
  render: function () {
    var tag = "";

    if (this.state.instaitems.length > 0){
      tag = this.state.hashtag;
      var instaitems = this.state.instaitems.map(function (ig_item) {
      	return (
          <li key={ig_item.id}>
        		<a href={ig_item.link}
        			 data-largesrc={ig_item.image}
        			 data-title={ig_item.username}
        			 data-description={ig_item.created_date, ig_item.created_time}>
              <img src={ig_item.image} width="306" height="306" />
        		</a>
      	 </li>
        );
      });
    }
    Grid.init();
    $('#centerButton').on('click', 'button#loadmore', function(event){
      event.preventDefault();
      var nextid = $('button#loadmore').data('next-id');
      var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=246422734.1677ed0.0c261b7ae36041fd94f0864cb4a0baaf';
      var $image = '';
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: endpoint,
        success: function(data){
          $.each(data.data, function(key, value){
            var caption = (value['caption'] != null) ? value['caption']['text'] : '';
            var $image = $('<li><a href="'+ value['link'] +'" data-largesrc="'+ value['images']['standard_resolution']['url'] +'" data-title="@'+ value['user']['username'] +'" data-description="'+ caption +'">' +
              '<img src="'+ value['images']['low_resolution']['url'] +'" />' +
              '</a></li>').appendTo( $('#og-grid') );
            Grid.addItems( $image );
          });
          // store new 'next-id'
          $('button#loadmore').data('next-id', data.pagination.next_max_tag_id);
        },
        beforeSend: function(){
          $('button#loadmore').text('Loading').fadeOut('fast');
        },
        complete: function(){
          $('button#loadmore').text('Load more').fadeIn('fast');
        }
      });
      return false;
    });
    return (
      <div>
        <h1>Collections for #{this.state.hashtag}</h1>
        <ul id="og-grid" className="og-grid">
          {instaitems}
        </ul>
        <p id="centerButton">
          <button
            id="loadmore"
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
