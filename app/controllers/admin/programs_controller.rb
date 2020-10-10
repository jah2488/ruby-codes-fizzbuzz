module Admin
  class ProgramsController < ApplicationController
    http_basic_authenticate_with name: "rubyconf", password: "rubyconf"

    def index
      programs = Program.all
      render locals: { programs: programs }
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
      # settings = unformatted_params.fetch(:settings).gsub(/["{}]/, '').split(",").map { |pairs| pairs.split("=>") }.to_h
      # unformatted_params.merge({ settings: settings })
    end
  end
end