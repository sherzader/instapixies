# == Schema Information
#
# Table name: collections
#
#  id         :integer          not null, primary key
#  hashtag    :string           not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Collection < ActiveRecord::Base
  validates :start_date, :end_date, presence: true
  before_create :ensure_valid_period

  def ensure_valid_period
    self.start_date <= self.end_date
  end

end
