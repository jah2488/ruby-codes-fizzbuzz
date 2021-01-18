class EvalCodeJob 
  include Sidekiq::Worker

  def perform
    Program.active.each do |program|
      Rails.cache.fetch("#{program.id}-#{program.entries.last.id}", expires_in: 1.minute) do
        ProgramChannel.broadcast_to(room(program), {
          action: :output,
          data: program.evaluate
        })
      end
    end
  end

  private
  def room(prog)
    "program_#{prog.id}"
  end
end
