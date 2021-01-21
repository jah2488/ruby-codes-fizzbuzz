class ProgramChannel < ApplicationCable::Channel
  def subscribed
    current_program.reload.with_lock do 
      current_program.update(settings: current_program.settings.merge({
        user_count: current_program.settings.fetch("user_count", 0) + 1
      }))
    end
    stream_for room
  end

  def unsubscribed
    current_program.reload.with_lock do 
      current_program.update(settings: current_program.settings.merge({
        user_count: current_program.settings.fetch("user_count", 1) - 1
      }))
    end
  end

  def receive(data)
    puts "receive:#{data}"
  end
  
  def message(data)
    program = current_program
    addition = data.fetch("addition")
    is_code = data.fetch("isCode")

    program.messages.create(name: addition, is_code: is_code, user: current_user, token: current_user.token, color: current_user.color)
    broadcast_message_view(program)

    return unless is_code

    if program.anarchy?
      program.process_addition(addition)
      ProgramChannel.broadcast_to(room, { action: :tick, data: program.view })
    else
      Vote.create(char: program.chars.find_or_create_by(name: addition))
    end
  end

  private

  def current_program
    Program.find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end

  def broadcast_message_view(program)
    ProgramChannel.broadcast_to(room, {
      action: :message,
      data: program.message_view
    })
  end
end
