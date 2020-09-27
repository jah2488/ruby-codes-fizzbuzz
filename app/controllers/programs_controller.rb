class ProgramsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    program = Program.includes(:chars).find(params.fetch(:id))
    
    if request.headers["HTTP_RESPONSE_TYPE"] == "json"
      render json: view(program)
    else
      render :show
    end
  end

  def update
    program = Program.find(params.fetch(:id))
    char = program.chars.find_or_create_by(name: params.fetch(:addition))
    Vote.create(char: char)
    if char.votes_count >= Program::VOTE_THRESHOLD[program.mode]
      program.update(code: "#{program.code} #{char.name}")
      program.chars.destroy_all
    end

    render json: view(program)
  end

  def clear
    program = Program.find(params.fetch(:id))
    program.update(code: "")
    program.chars.destroy_all

    render json: view(program)
  end

  private

  def view(program)
    {
      id: program.id,
      name: program.name,
      mode: program.mode,
      code: program.code,
      chars: program.chars.order(votes_count: :desc)
    }
  end
end