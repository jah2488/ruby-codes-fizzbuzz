class ProgramsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    program = Program.find(params.fetch(:id))
    if request.headers["HTTP_RESPONSE_TYPE"] == "json"
      render json: program.view
    else
      cookies[:user_token] = find_user.token
      render :show, locals: { program: program }
    end
  end

  private
  
  def find_user
    token = cookies[:user_token]
    User.find_or_create_by_token(token, request.remote_ip)
  end
end