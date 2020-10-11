class ProgramChannel < ApplicationCable::Channel
  periodically :tick, every: 1.seconds

  def subscribed
    stream_for room
  end

  def set_mode(message)
    current_program.update(
      mode: message["data"],
      settings: current_program.settings.merge({
        vote_interval: Program::VOTE_THRESHOLD[message["data"]],
        vote_threshold: Program::VOTE_THRESHOLD[message["data"]],
      })
    )
    ProgramChannel.broadcast_to(room, { action: :update, data: current_program.tick_view })
  end

  def set_max_input_mode(message)
    current_program.update(settings: current_program.settings.merge({
      max_input_mode: message["data"]
    }))
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
  end

  def set_vote_interval(message)
    current_program.update(settings: current_program.settings.merge({
      vote_interval: message["data"]
    }))
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
  end

  def pause
    current_program.update(settings: current_program.settings.merge({
      play_state: "paused" }))
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
  end

  def resume
    current_program.update(settings: current_program.settings.merge({
      play_state: "playing" }))
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
  end

  def reset_tick
    current_program.update(tick: 0)
    ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts "receive:#{data}"
  end

  def tick
    if current_program.playing?
      current_program.update(tick: current_program.tick.succ)
      ProgramChannel.broadcast_to(room, { action: :tick, data: current_program.tick_view })
    end
  end

  def evaluate_code
    ProgramChannel.broadcast_to(room, { action: :output, data: current_program.evaluate })
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

    ProgramChannel.broadcast_to(room, { action: :message, data: program.view })
    evaluate_code
  end

  def clear
    program = current_program
    program.update(code: "")
    program.chars.destroy_all

    ProgramChannel.broadcast_to(room, { action: :clear, data: program.view })
  end

  private
  def current_program
    Program.find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end
end
