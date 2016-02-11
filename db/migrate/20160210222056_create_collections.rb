class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :hashtag, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.timestamps null: false
    end

    add_index :collections, :hashtag
  end
end
