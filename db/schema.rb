# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170223174455) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pitch_events", force: :cascade do |t|
    t.integer "game_id"
    t.integer "season_id"
    t.string  "game_date"
    t.integer "year"
    t.string  "sv_pitch_id"
    t.integer "at_bat_number"
    t.integer "pitch_number"
    t.integer "inning"
    t.string  "top_inning_sw"
    t.string  "event_type"
    t.string  "event_result"
    t.integer "pre_balls"
    t.integer "pre_strikes"
    t.integer "pre_outs"
    t.integer "batter_id"
    t.string  "bat_side"
    t.integer "pitcher_id"
    t.string  "throws"
    t.float   "initial_speed"
    t.string  "pitch_type"
    t.float   "break_x"
    t.float   "break_z"
    t.float   "plate_x"
    t.float   "plate_z"
    t.string  "hit_trajectory"
  end

  create_table "pitchers", force: :cascade do |t|
    t.string "name",      default: "", null: false
    t.string "birthdate", default: "", null: false
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year",                          default: 2015, null: false
    t.integer "pitcher_id",                                   null: false
    t.string  "org"
    t.string  "league"
    t.integer "games"
    t.integer "games_started"
    t.integer "total_batters_faced"
    t.integer "singles"
    t.integer "doubles"
    t.integer "triples"
    t.integer "homeruns"
    t.integer "walks"
    t.integer "intentional_walks"
    t.integer "hit_by_pitch"
    t.integer "strikeouts"
    t.float   "ground_ball_percentage"
    t.float   "line_drive_percentage"
    t.float   "fly_ball_percentage"
    t.float   "strikeout_percentage"
    t.float   "walk_percentage"
    t.float   "earned_run_average"
    t.float   "fielding_independent_pitching"
    t.float   "wins_above_replacement"
  end

  create_table "todos", force: :cascade do |t|
    t.string   "label",      default: "",    null: false
    t.boolean  "complete",   default: false, null: false
    t.integer  "index",      default: 0,     null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

end
