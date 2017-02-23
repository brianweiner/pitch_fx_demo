class CreateSeasons < ActiveRecord::Migration[5.0]
  def change
    create_table :seasons do |t|
      t.integer :year,    default: 2015,    null: false
      t.integer :pitcher_id,  null: false
      t.string  :league
      t.string  :org
      t.integer :games
      t.integer :games_started
      t.integer :total_batters_faced
      t.integer :singles
      t.integer :doubles
      t.integer :triples
      t.integer :homeruns
      t.integer :walks
      t.integer :intentional_walks
      t.integer :hit_by_pitch
      t.integer :strikeouts
      t.float  :ground_ball_percentage
      t.float  :line_drive_percentage
      t.float  :fly_ball_percentage
      t.float  :strikeout_percentage
      t.float  :walk_percentage
      t.float  :earned_run_average
      t.float  :fielding_independent_pitching
      t.float  :wins_above_replacement
    end
  end
end
