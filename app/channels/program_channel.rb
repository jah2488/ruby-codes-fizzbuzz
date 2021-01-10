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

  def evaluate_code
    ProgramChannel.broadcast_to(room, {
      action: :output,
      data: current_program.evaluate
    })
  end

  def message(data)
    program = current_program
    addition = data.fetch("addition")
    is_code = data.fetch("isCode")

    program.messages.create(name: addition, is_code: is_code, user: current_user)

    if is_code
      char = program.chars.find_or_create_by(name: addition)
      if program.anarchy?
        program.with_lock do
          program.process_addition(addition)
        end
      else
        Vote.create(char: char)
        if char.votes_count >= program.settings["vote_threshold"]
          program.with_lock do
            program.process_addition(addition)
          end
          program.chars.destroy_all
        end
      end
    end

    ProgramChannel.broadcast_to(room, {
      action: :message,
      data: program.view
    })
    evaluate_code
  end

  private
  def current_program
    Program.includes(:entries, :messages).find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
