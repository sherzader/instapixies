class RemoveMaxTagId < ActiveRecord::Migration
  def change
    remove_column :collections, :next_max_tag_id, :string
  end
end
