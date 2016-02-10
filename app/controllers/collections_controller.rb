class CollectionsController < ApplicationController
  ACCESS-TOKEN = "246422734.1677ed0.0c261b7ae36041fd94f0864cb4a0baaf"
  'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + ACCESS-TOKEN

  def show
    hashtag = params[:q]
  end

  def create
    @collection = Collection.new(collection_params)
    if @collection.save
      render :show
    else
      render :new
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
