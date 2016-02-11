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
      # filter fetched ig data for objects during time period
      filtered_media = resp['data'].select do |resp_item|
        # convert ig created_time's unix format to datetime
        DateTime.strptime(resp_item['created_time'], '%s')
                .between?(@collection.start_date, @collection.end_date)
      end

      @collection.media = filtered_media
      @collection.save

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
    params.require(:collection).permit(:start_date, :end_date, :hashtag, :media)
  end

end
