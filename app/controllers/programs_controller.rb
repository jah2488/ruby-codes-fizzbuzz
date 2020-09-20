class ProgramsController < ApplicationController
  def show
    program = Program.find(params.fetch(:id))
    render locals: { program: program }
  end

  def update
    program = Program.find(params.fetch(:id))
    char = program.chars.find_or_create_by(name: params.dig(:program, :addition))
    Vote.create(char: char)
    if char.votes_count >= Program::VOTE_THRESHOLD[program.mode]
      program.update(code: "#{program.code} #{char.name}")
      program.chars.destroy_all
    end
    redirect_to program
  end

  def clear
    program = Program.find(params.fetch(:id))
    program.update(code: "")
    program.chars.destroy_all
    redirect_to program
  end
end