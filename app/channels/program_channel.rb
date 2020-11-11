class ProgramChannel < ApplicationCable::Channel
  def subscribed
    stream_for room
  end

  def fetch_user_token
    ProgramChannel.broadcast_to(room, {
      action: :set_user_token,
      data: { token: current_user.token }
    })
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

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
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
      Vote.create(char: char)
      if char.votes_count >= program.settings["vote_threshold"]
        program.update(code: program.formatted_code(char))
        program.chars.destroy_all
      end
    end

    ProgramChannel.broadcast_to(room, {
      action: :message,
      data: program.view
    })
    evaluate_code
  end

  def clear
    program = current_program
    program.update(code: "")
    program.chars.destroy_all

    ProgramChannel.broadcast_to(room, {
      action: :clear,
      data: program.view
    })
  end

  private
  def current_program
    Program.find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
