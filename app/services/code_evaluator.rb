class CodeEvaluator
  attr_reader :code, :output, :error, :status

  def initialize(code)
    self.code = code
  end

  def process
    self.output,
    self.error,
    self.status = Open3.capture3('ruby', '-e', self.sanitized_code)
    self
  end

  def error?
    self.error.length > 0
  end

  def sanitized_code
    @sanitize ||= %w(
      `
      System
      exec
      eval
      %x
      Open3
      rm\ -rf
      ruby
      bash
    ).reduce(code) do |script, unsafe|
      script.gsub(unsafe, '')
    end
  end

  private
  attr_writer :code, :output, :error, :status
end