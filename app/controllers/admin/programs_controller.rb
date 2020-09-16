module Admin
  class ProgramsController < ApplicationController
    http_basic_authenticate_with name: "rubyconf", password: "rubyconf"

    def index
    end

    def show
    end

    def new
      render locals: {
        program: Program.new
      }
    end

    def update
    end
  end
end