class PitchEventsController < ApplicationController

  def show
    @pitcher = Pitcher.find(params[:pitcher_id])
    @events = @pitcher.pitch_events.where(pre_balls: search_params[:balls], pre_strikes: search_params[:strikes], pre_outs: search_params[:outs])
    render json: @events
  end

  private

  def search_params
    params.require(:pitch_event).permit(:balls, :strikes, :outs)
  end
end
