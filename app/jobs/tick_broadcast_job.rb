class TickBroadcastJob
  include Sidekiq::Worker

  def perform
    Program.running.each do |program|
      now = Time.zone.now
      Rails.logger.warn("-")
      if now - program.updated_at < 1.1
        Rails.logger.warn("******************* skipping -- now=#{program.updated_at - now}")
        next
      end

      Rails.logger.warn("******************* prog -- now=#{program.updated_at - now}")

      
      if (program.tick + 1) >= program.settings["vote_interval"]
        program.update(tick: 0)
        char = program.chars.order("votes_count DESC").first
        if char.present?
          program.with_lock do
            program.process_addition(char.name)
            program.chars.destroy_all
          end
        end
        Sidekiq::Cron::Job.destroy_all!
        broadcast_view(program)
        broadcast_evaluate(program)
      else
        broadcast_tick_view(program)
      end
      
      program.update(tick: program.tick.succ)

      Rails.logger.warn("******************* diff -- now=#{Time.zone.now - now}")

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
