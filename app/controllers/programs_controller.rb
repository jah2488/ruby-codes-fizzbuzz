class ProgramsController < ApplicationController
  def show
    program = Program.find(params.fetch(:id))
    render locals: { program: program }
  end

  def update
    program = Program.find(params.fetch(:id))
    code = program.code + " #{params.dig(:program, :addition)}"
    unless program.update(code: code)
      flash[:alert] = "Something went wrong!"
    end
    redirect_to program
  end

  def tab
    program = Program.find(params.fetch(:id))
    code = program.code + "&nbsp;&nbsp;"
    program.update(code: code)
    redirect_to program
  end

  def new_line
    program = Program.find(params.fetch(:id))
    code = program.code + "<br />"
    program.update(code: code)
    redirect_to program
  end

  def clear
    program = Program.find(params.fetch(:id))
    program.update(code: "")
    redirect_to program
  end

  private

  def program_params
    params.require(:program).permit(:addition)
  end
end