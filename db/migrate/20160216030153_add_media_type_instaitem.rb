class AddMediaTypeInstaitem < ActiveRecord::Migration
  def change
    add_column :instaitems, :type, :string, null: false
  end
end
