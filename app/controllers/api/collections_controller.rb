class Api::CollectionsController < ApplicationController
  require 'date'
  require 'httparty'

  def show
    # @collection = Collection.find_by(id: params[:id])
    # render json: @collection
  end

  def create
    ACCESS_TOKEN = "246422734.1677ed0.0c261b7ae36041fd94f0864cb4a0baaf"
    # find all instagram posts with user's hashtag query
    hashtag = 'snow'
    url = 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + ACCESS_TOKEN
    resp = HTTParty.get(url)
    p resp
    # @collection = Collection.new(collection_params)
    #
    # if @collection.save
    #   # filter fetched ig data for objects during time period
    #   filtered_media = resp['data'].select do |resp_item|
          # convert ig created_time's unix format to datetime
    #     DateTime.strptime(resp_item['created_time'], '%s').between?
    #            (@collection.start_date, @collection.end_date)
    #   end

      # render :show
    # else
    #   render json: @collection.errors.full_messages, status: 422
    # end
  end

  def new
    # @collection = Collection.new
  end

  private
  def collection_params
    params.require(:collection).permit(:start_date, :end_date, :hashtag, :media)
  end

end
