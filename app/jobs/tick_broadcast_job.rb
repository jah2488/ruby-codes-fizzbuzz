class TickBroadcastJob
  include Sidekiq::Worker

  def perform
    Program.running.each do |program|
      now = Time.zone.now
      next if now - program.updated_at < 1.1

      if (program.tick + 1) >= program.settings["vote_interval"]
        program.update(tick: 0)
        char = program.chars.order("votes_count DESC").first
        if char.present?
          program.with_lock do
            program.process_addition(char.name)
            program.chars.destroy_all
          end
          broadcast_view(program)
          broadcast_evaluate(program)
        end
      else
        broadcast_tick_view(program)
      end
      program.update(tick: program.tick.succ)
    end
  end

  private

  def broadcast_view(program)
    ProgramChannel.broadcast_to("program_#{program.id}", {
      action: :tick,
      data: program.view
    })
  end
  
  def broadcast_tick_view(program)
    ProgramChannel.broadcast_to("program_#{program.id}", {
      action: :tick,
      data: program.tick_view
    })
  end

  def broadcast_evaluate(program)
    ProgramChannel.broadcast_to("program_#{program.id}", {
      action: :output,
      data: program.evaluate
    })
  end
end
