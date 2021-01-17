class AdminProgramChannel < ApplicationCable::Channel
  periodically :tick, every: 5.seconds

  def subscribed
    stream_for admin_room
  end

  def unsubscribed
  end

  def tick
    AdminProgramChannel.broadcast_to(admin_room, {
      action: :tick,
      data: current_program.tick_view
    })
  end

  def set_debounce_interval(message)
    current_program.update(settings: current_program.settings.merge({
      debounce_interval: message["data"]
    }))
    ProgramChannel.broadcast_to(room, {
      action: :tick,
      data: current_program.tick_view
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

  def receive(data)
    puts "receive:#{data}"
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
  def current_program
    Program.includes(:entries, :messages).find(params.fetch(:id))
  end

  def room
    "program_#{current_program.id}"
  end

  def admin_room
    "admin_program_#{current_program.id}"
  end
end
