class CreateInstaitems < ActiveRecord::Migration
  def change
    remove_column :collections, :media
    add_column :collections, :next_max_tag_id, :string, null: false

    create_table :instaitems do |t|
      t.string :image, null: false
      t.datetime :created_time, null: false
      t.string :username, null: false
      t.string :link, null: false
      t.integer :collection_id, null: false

      t.timestamps null: false
    end
  end
end
