class ProgramChannel < ApplicationCable::Channel
  def subscribed
    puts "Subscribed!"
    stream_for Program.find(params.fetch(:id))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def server_tick
  end

  def join
  end

  def leave
  end

  def message
  end
end
