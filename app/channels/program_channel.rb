class ProgramChannel < ApplicationCable::Channel
  CODE_KEY = "!"
  periodically :tick, every: 1.seconds

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

  def tick
    current_program.update(tick: current_program.tick.succ)
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.view })
  end

  def message(data)
    program = Program.find(current_program.id)
    addition = data.fetch("addition")
    is_code = data.fetch("isCode")
    program.messages.create(name: addition, is_code: is_code, user: current_user)
    if is_code
      char = program.chars.find_or_create_by(name: addition)
      Vote.create(char: char)
      if char.votes_count >= Program::VOTE_THRESHOLD[program.mode]
        program.update(code: "#{program.code} #{char.formatted_name}")
        program.chars.destroy_all
      end
    end
    ProgramChannel.broadcast_to(room, { action: :message, data: program.view })
  end

  def clear
    program = Program.find(current_program.id)
    program.update(code: "")
    program.chars.destroy_all
    ProgramChannel.broadcast_to(room, { action: :clear, data: program.view })
  end

  private
  def current_program
    @current_program ||= Program.find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
