class ProgramsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    program = Program.includes(:chars).find(params.fetch(:id))
    
    if request.headers["HTTP_RESPONSE_TYPE"] == "json"
      render json: program.view
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

    render json: program.view
  end

  def clear
    program = Program.find(params.fetch(:id))
    program.update(code: "")
    program.chars.destroy_all

    render json: program.view
  end
end