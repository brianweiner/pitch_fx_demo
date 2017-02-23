class PitchEvent < ApplicationRecord
  validates :game_id, presence: true
  validates :pitcher_id, presence: true

  belongs_to :season
  belongs_to :pitcher
end
