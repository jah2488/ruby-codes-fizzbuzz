class MessageProcessor
  def initialize
    Rails.logger.info "---- MessageProcessor(#{self.object_id}) Created"
    @queue = Queue.new
    @working = false
    @thread_counter = 1
  end

  def enqueue(message)
    Rails.logger.info "---- MessageProcessor(#{self.object_id}) Enqueueing Message(#{message[:id]})"
    @queue.enq(message)
  end

  def process
    Rails.logger.info "---- MessageProcessor(#{self.object_id}) 0 Queue(#{@queue.size})"
    Rails.logger.info "---- MessageProcessor(#{self.object_id}) 0 Working(#{@working})"
    return if @working
    return if @queue.empty?

    consumer = Thread.new do
      Thread.current[:id] = @thread_counter
      @thread_counter += 1

      @working = true
      Rails.logger.info "---- MessageProcessor(#{Thread.current[:id]}) 1 Queue(#{@queue.size})"
      message = @queue.deq
      Rails.logger.info "---- MessageProcessor(#{Thread.current[:id]}) Processing Message(#{message[:id]})"
      program = Program.find(message[:program_id])

      if program.anarchy?
        program.process_addition(message[:name])
        next
      end

      char = program.chars.find_or_create_by(name: message[:name])
      if (char.votes_count || 0) >= program.settings["vote_threshold"] - 1
        Rails.logger.info "---- MessageProcessor(#{Thread.current[:id]}) 2 Queue(#{@queue.size})"
        Rails.logger.info "---- MessageProcessor(#{Thread.current[:id]}) Vote Threshold Reached, Clearing Queue"
        program.process_addition(message[:name])
        program.chars.destroy_all
        @queue.clear
        Rails.logger.info "---- MessageProcessor(#{Thread.current[:id]}) 3 Queue(#{@queue.size})"
      else
        Vote.create(char: char)
      end

      ProgramChannel.broadcast_to("program_#{program.id}", {
        action: :message,
        data: program.reload.view
      })
      @working = false
    end
    puts consumer
  end
end