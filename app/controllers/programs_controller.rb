class ProgramsController < ApplicationController
  def show
    program = Program.includes(:chars).find(params.fetch(:id))
    render locals: { program: program }
  end

  def update
    program = Program.find(params.fetch(:id))
    unless program.chars.create!(name: params[:program][:addition])
      flash[:alert] = "Something went wrong!"
    end
    redirect_to program
  end

  def tab
    program = Program.find(params.fetch(:id))
    program.chars.create!(name: "&nbsp;&nbsp;")
    redirect_to program
  end

  def new_line
    program = Program.find(params.fetch(:id))
    program.chars.create!(name: "<br />")
    redirect_to program
  end

  def clear
    program = Program.find(params.fetch(:id))
    program.chars.destroy_all
    redirect_to program
  end

  private

  def program_params
    params.require(:program).permit(:addition)
  end
end