begin
  require 'rufus-scheduler'

  Rufus::Scheduler.singleton.every '1s' do
    Program.running.each do |program|
      program.update(tick: program.tick.succ)
      
      if program.tick >= program.settings["vote_interval"]
        program.update(tick: 0)
        char = program.chars.order("votes_count DESC").first
        if char.present?
          program.with_lock do
            program.process_addition(char.name)
          end
          program.chars.destroy_all
        end
      end
      ProgramChannel.broadcast_to("program_#{program.id}", {
      # ActionCable.server.broadcast "program_#{program.id}", {
        action: :tick,
        data: program.tick_view
      })
    end
    Rails.logger.flush
  end
rescue StandardError, LoadError => e
  Rails.logger.error "Error in Scheduler: #{e.message}"
end
