class Pitcher < ApplicationRecord
  validates :name, presence: true
  validates :birthdate, presence: true

  has_many :seasons
  has_many :pitch_events
end
