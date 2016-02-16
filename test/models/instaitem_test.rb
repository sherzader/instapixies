# == Schema Information
#
# Table name: instaitems
#
#  id            :integer          not null, primary key
#  image         :string           not null
#  created_time  :datetime         not null
#  username      :string           not null
#  link          :string           not null
#  collection_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  type          :string           not null
#

require 'test_helper'

class InstaitemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
