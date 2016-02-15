var ApiUtil = {
  createCollection: function (users_group) {
    $.ajax({
      url: "api/users_groups",
      type: "GET",
      success: function (query) {
        ApiActions.receiveAllUsersGroups(query);
       }
     });
  },
  fetchCollection: function (collection) {
    $.ajax({
      url: "api/collections/" + collection.id,
      type: "GET",
      success: function (query) {
        ApiActions.receiveAllUsersGroups(query);
       }
     });
  }
};

module.exports = ApiUtil;
