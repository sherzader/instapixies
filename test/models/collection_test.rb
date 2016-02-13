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
#  next_max_tag_id :string           not null
#

require 'test_helper'

class CollectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
