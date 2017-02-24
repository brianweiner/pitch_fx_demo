class PitchEvent < ApplicationRecord
  validates :game_id, presence: true
  validates :pitcher_id, presence: true

  belongs_to :season
  belongs_to :pitcher

  scope :full_count, -> { where(pre_balls: 3, pre_strikes: 2) }

end
