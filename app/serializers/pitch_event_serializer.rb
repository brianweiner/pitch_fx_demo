class PitchEventSerializer < ActiveModel::Serializer
  attributes :pitch_type, :plate_x, :plate_z, :event_type, :event_result, :sv_pitch_id
end
