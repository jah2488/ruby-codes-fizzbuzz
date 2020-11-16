module Admin
  class ProgramsController < ApplicationController
    if Rails.env.production?
      http_basic_authenticate_with name: ENV.fetch("HTTP_AUTH_NAME"), password: ENV.fetch("HTTP_AUTH_PASS")
    end

    def index
      render locals: { 
        programs: Program.all
      }
    end

    def show
    end

    def new
      render locals: {
        program: Program.new
      }
    end

    def create
      program = Program.new(program_params)
      if program.save
        flash[:notice] = "Program Created!"
        redirect_to program
      else
        flash[:alert] = "Something went wrong!"
        render :new, locals: {
          program: program
        }
      end
    end

    def update
    end

    private

    def program_params
      params.require(:program).permit(:name, :mode)
    end
  end
end