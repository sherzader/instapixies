class Api::CollectionsController < ApplicationController
  require 'date'
  require 'httparty'

  ACCESS_TOKEN = "246422734.1677ed0.0c261b7ae36041fd94f0864cb4a0baaf"

  def show
    @collection = Collection.find(params[:id])
  end

  def create
    @collection = Collection.new(collection_params)

    if @collection.save
      #fetch instagram media matching created collection's hashtag query
      url = 'https://api.instagram.com/v1/tags/' + @collection.hashtag + '/media/recent?access_token=' + ACCESS_TOKEN
      resp = HTTParty.get(url)
      # for pagination loading more content
      @collection.next_max_tag_id = resp["pagination"]["next_max_tag_id"]

      # filter fetched ig data for objects during time period
      filtered_media = resp['data'].select do |resp_item|
        # convert ig created_time's unix format to datetime
        DateTime.strptime(resp_item['caption']['created_time'], '%s')
                .between?(@collection.start_date, @collection.end_date)
      end

      filtered_media.each do |ig_item|
        instaitem = Instaitem.new(
          username: ig_item["user"]["username"],
          link: ig_item["link"],
          created_time: DateTime.strptime(ig_item["caption"]["created_time"], '%s'),
          image: ig_item["images"]["standard_resolution"]["url"],
          collection_id: @collection.id
        )
        instaitem.save!
      end

      render :show
    else
      #add error messages for invalid start and end date
      render json: @collection.errors.full_messages, status: 422
    end
  end

  def new
    @collection = Collection.new
  end

  private
  def collection_params
    params.require(:collection).permit(:start_date, :end_date, :hashtag)
  end

end
