class CreatePitchers < ActiveRecord::Migration[5.0]
  def change
    create_table :pitchers do |t|
      t.string :name,     default: "",    null: false
      t.string :birthdate,  default: "",  null: false
    end
  end
end
