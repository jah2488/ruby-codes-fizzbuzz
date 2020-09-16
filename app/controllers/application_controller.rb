class ApplicationController < ActionController::Base
  def index
    render locals: {
      programs: Program.active
    }
  end
end
