# == Schema Information
#
# Table name: collections
#
#  id              :integer          not null, primary key
#  hashtag         :string           not null
#  start_date      :datetime         not null
#  end_date        :datetime         not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  next_max_tag_id :string
#

class Collection < ActiveRecord::Base
  validates :start_date, :end_date, presence: true
  before_create :ensure_valid_period

  has_many :instaitems

  def ensure_valid_period
    self.start_date <= self.end_date
  end

  def fetchMorePhotos
    var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=246422734.1677ed0.0c261b7ae36041fd94f0864cb4a0baaf';

  end

end
