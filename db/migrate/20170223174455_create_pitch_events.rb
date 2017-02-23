class CreatePitchEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :pitch_events do |t|
      t.integer :game_id
      t.integer :season_id
      t.string  :game_date
      t.integer :year
      t.string  :sv_pitch_id
      t.integer :at_bat_number
      t.integer :pitch_number
      t.integer :inning
      t.string  :top_inning_sw
      t.string  :event_type
      t.string  :event_result
      t.integer :pre_balls
      t.integer :pre_strikes
      t.integer :pre_outs
      t.integer :batter_id
      t.string  :bat_side
      t.integer :pitcher_id
      t.string  :throws
      t.float   :initial_speed
      t.string  :pitch_type
      t.float   :break_x
      t.float   :break_z
      t.float   :plate_x
      t.float   :plate_z
      t.string  :hit_trajectory

    end
  end
end
