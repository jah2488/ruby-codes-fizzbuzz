class TickBroadcastJob
  include Sidekiq::Worker

  def perform
    Program.running.each do |program|
      now = Time.zone.now
      next if now - program.updated_at < 0.40

      if (program.tick + 1) > program.settings["vote_interval"]
        program.update(tick: 0)
        char = program.chars.order("votes_count DESC").first
        if char.present?
          program.with_lock do
            program.process_addition(char.name)
            program.chars.destroy_all
          end
          Sidekiq::ScheduledSet.new.clear
          Sidekiq::Queue.all.each(&:clear)
          broadcast_view(program)
        end
      else
        broadcast_tick_view(program)
        program.update(tick: program.tick.succ)
      end
    end
  end

  private

  def broadcast_view(program)
    ProgramChannel.broadcast_to(room(program), {
      action: :tick,
      data: program.view
    })
  end
  
  def broadcast_tick_view(program)
    ProgramChannel.broadcast_to(room(program), {
      action: :tick,
      data: program.tick_view
    })
  end

  def room(prog)
    "program_#{prog.id}"
  end
end
