# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'


### Load Pitchers and respective seasons into database
pitchers = File.read(Rails.root.join('db', 'Pitching_Statistics.csv'))
csv = CSV.parse(pitchers, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  hash = row.to_hash

  pitcher = Pitcher.find_or_initialize_by(name: hash['Name']) do |p|
    p.id = hash['pitcher_id']
    p.birthdate = hash['birth_date']
    p.save!
  end
  season = Season.find_or_initialize_by(year: hash['Year'], pitcher_id: hash['pitcher_id']) do |s|
    s.pitcher_id = hash['pitcher_id']
    s.org = hash['org']
    s.league = hash['League']
    s.games = hash['G']
    s.games_started = hash['GS']
    s.total_batters_faced = hash['TBF']
    s.singles = hash['X1B']
    s.doubles = hash['X2B']
    s.triples = hash['X3B']
    s.homeruns = hash['HR']
    s.walks = hash['BB']
    s.intentional_walks = hash['IBB']
    s.hit_by_pitch = hash['HBP']
    s.strikeouts = hash['SO']
    s.ground_ball_percentage = hash['GB.']
    s.line_drive_percentage = hash['LD.']
    s.fly_ball_percentage = hash['FB.']
    s.earned_run_average = hash['ERA']
    s.fielding_independent_pitching = hash['FIP']
    s.wins_above_replacement = hash['rWAR']
    s.save!
  end
end

pitch_events = File.read(Rails.root.join('db', 'Pitchfx.csv'))
csv = CSV.parse(pitch_events, :headers => true, :encoding => 'ISO-8859-1')
ActiveRecord::Base.transaction do
  csv.each do |row|
    hash = row.to_hash
    pitcher = Pitcher.find_by(id: hash['pitcher_id'])
    season = Season.find_by(year: hash['year'].to_i, pitcher: pitcher)

    PitchEvent.find_or_initialize_by(sv_pitch_id: hash['sv_pitch_id']) do |event|
      event.game_id = hash['game_id']
      event.season_id = season.id
      event.game_date = hash['game_date']
      event.year = hash['year']
      event.at_bat_number = hash['at_bat_number']
      event.pitch_number = hash['pitch_number']
      event.inning = hash['inning']
      event.top_inning_sw = hash['top_inning_sw']
      event.event_type = hash['event_type']
      event.event_result = hash['event_result']
      event.pre_balls = hash['pre_balls']
      event.pre_strikes = hash['pre_strikes']
      event.pre_outs = hash['pre_outs']
      event.batter_id = hash['batter_id']
      event.bat_side = hash['bat_side']
      event.pitcher_id = pitcher.id
      event.throws = hash['throws']
      event.initial_speed = hash['initial_speed']
      event.pitch_type = hash['pitch_type']
      event.break_x = hash['break_x']
      event.break_z = hash['break_z']
      event.plate_x = hash['plate_x']
      event.plate_z = hash['plate_z']
      event.hit_trajectory = hash['HitTrajectory']
      event.save!
    end
  end
end




