class AddMediaTypeInstaitem < ActiveRecord::Migration
  def change
    add_column :instaitems, :media_type, :string, null: false
  end
end
