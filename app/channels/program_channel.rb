class ProgramChannel < ApplicationCable::Channel
  def subscribed
    puts "Subscribed!"
    stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts "receive:#{data}"
  end

  def server_tick
  end

  def message(data)
    char = current_program.chars.find_or_create_by(name: data.fetch("addition"))
    Vote.create(char: char)
    current_program.update(code: "#{current_program.code} #{char.name}")
    ProgramChannel.broadcast_to(room, current_program.view)
  end

  private
  def current_program
    @current_program ||= Program.find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
