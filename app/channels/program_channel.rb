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

  def set_mode(message)
    current_program.update(
      mode: message["data"],
      settings: current_program.settings.merge({
        vote_interval: Program::VOTE_THRESHOLD[message["data"]],
        vote_threshold: Program::VOTE_THRESHOLD[message["data"]],
      })
    )
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_max_input_mode(message)
    current_program.update(settings: current_program.settings.merge({
      max_input_mode: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_can_vote(message)
    current_program.update(settings: current_program.settings.merge({
      can_vote: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_vote_interval(message)
    current_program.update(settings: current_program.settings.merge({
      vote_interval: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_vote_threshold(message)
    current_program.update(settings: current_program.settings.merge({
      vote_threshold: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_confetti(message)
    current_program.update(settings: current_program.settings.merge({
      confetti: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def pause
    current_program.update(settings: current_program.settings.merge({
      play_state: "paused" }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def resume
    current_program.update(settings: current_program.settings.merge({
      play_state: "playing" }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
    })
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

    message = program.messages.create(
      name: addition,
      is_code: is_code,
      user: current_user
    )

    if is_code
      message_processor.enqueue({
        id: message.id,
        name: addition,
        user: current_user,
        program_id: program.id
      })
    end

    ProgramChannel.broadcast_to(room, {
      action: :message,
      data: program.reload.view
    })

    message_processor.process
    evaluate_code
  end

  def clear
    program = current_program
    program.entries.destroy_all
    program.chars.destroy_all

    ProgramChannel.broadcast_to(room, {
      action: :clear,
      data: program.view
    })
  end

  private
  def message_processor
    $message_process ||= MessageProcessor.new
  end

  def current_program
    Program.includes(:entries, :messages).find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
