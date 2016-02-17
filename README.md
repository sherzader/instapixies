#[Live](http://instapixies.herokuapp.com)

#Instapixies
##A full stack web app built on Ruby on Rails, ReactJS, and jQuery

###Backend:
I made two models to display Instagram's media. I wanted the user to make a collection that has many Instagram items. The data is stored in a PostgreSQL database. Upon creating a collection on the frontend, a GET request is issued to Instagram's API using the user's hashtag input in the frontend form. The endpoint for this call is fetching from Instagram's recent media. The response data contains at most 20 media objects. They are filtered for the start and end date's the user created on the frontend form. Instagram uses a UNIX timestamp format. Rails uses the datetime format, similar to the html input type's datetime-local format used on the frontend form. So I chose to convert the UNIX timestamp to datetime using Ruby's `Datetime.strptime(date, '%s')`. Then each is made into a new Instaitem object. This all happens in the Collection controller. I did not see a need for allocating a controller to the Instaitem seeing how there is an association for Collection and Instaitems declared in both of their models. The models contain the appropriate Active Record validations as well. To fetch the next 20 photos, I used the Collection's update action in the controller to make a GET request to Instagram's API for media after the `next_max_tag_id` saved from the initial response object. I then reset the `next_max_tag_id`, needed for this pagination to continue. The process from here is similar to the create action. I have one Rails view, a json.jbuilder file for showing a collection. This is how the frontend displays the data in the database. The show view extracts the Collection and its Instaitems association for internal API calls from the frontend.

- [x] Security feature: Instagram access token git-ignored and placed in an environment variable
- [x] Collection model and Instaitem model is a _one has many_ relationship
- [x] Makes a GET request to Instagram's API to fetch photos/videos
- [x] Pagination using next_max_tag_id which updates on client-side request

###Frontend:
This is a single page web app made possible by the Javascript framework React. The user sees two views via the React router. The homepage of this web app is a form for creating the Collection. The form's submit button triggers an internal AJAX call to the Rails route `api/collections` to POST the form field's data. This creates a Collection and its Instaitems. Upon submitting the completed form with valid field values, I made the React router take the user to the `/show/:id` url. The user actually isn't going anywhere, the window.location is being manipulated to mimic this feeling. Here the user will see all the Instagram media displayed inline like a grid. Html image and video tags are created by checking the value of the Instaitem's media type. This attribute was extracted from the response object in the backend. Videos are set to autoplay. All items are formatted to be 306px wide and tall. The caption consists of the username of the poster, which links to the native Instagram link, and the date of the hashtag caption's creation. At the bottom of the page there are two buttons. One fetches more Instagram media by making an internal AJAX call to `api/collections/:id` to send a PATCH request, and receives at most the next 20 older items. The adjacent button links back to the React root route displaying the new collection form.

- [x] HTML form fields for start date and end date, and hashtag.
- [x] React routes for root `/` and show collection `/show/:id`
- [x] jQuery AJAX requests for processing internal API calls to Rails routes in order to receive database records.
- [x] CSS styling for responsive and minimalist UI design

###To-do:
- [ ] Build a robust, fault tolerant backend: saving a collection when the server dies, minimize API calls to prevent rate limit
- [ ] Browse button
- [ ] More user-friendly html form fields for start and end dates 
- [ ] Expanding view for Instagram items
- [ ] Infinite scroll
