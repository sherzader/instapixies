json.extract! @collection, :id, :hashtag, :next_max_tag_id, :start_date, :end_date

json.instaitems(@collection.instaitems) do |ig_item|
  json.id ig_item.id
	json.username ig_item.username
	json.image ig_item.image
	json.link ig_item.link
  json.media_type ig_item.media_type
	json.created_date ig_item.created_time.strftime("%A, %B %e, %Y")
	json.created_time ig_item.created_time.strftime("%l:%M %p")
end
