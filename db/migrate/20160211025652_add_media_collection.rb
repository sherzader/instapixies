class AddMediaCollection < ActiveRecord::Migration
  def change
    add_column :collections, :media, :text, array:true, default: []
  end
end
