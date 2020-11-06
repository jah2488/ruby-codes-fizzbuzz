require 'rufus-scheduler'

if Rails.env.development?
  Rufus::Scheduler.singleton.every '1s' do
    Program.running.each do |program|
      program.update(tick: program.tick.succ) # Rails.logger.debug "Incrementing Game Tick for <Program##{program.id}> to [#{program.tick}]"
    end
    Rails.logger.flush
  end
end
