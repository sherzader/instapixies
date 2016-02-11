class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :hashtag, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.text :media, array: true, default: []
      t.timestamps null: false
    end
  end
end
