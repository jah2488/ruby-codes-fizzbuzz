class ProgramsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    program = Program.find(params.fetch(:id))
    
    if request.headers["HTTP_RESPONSE_TYPE"] == "json"
      render json: program.view
    else
      render :show
    end
  end

  private

  def current_user
    token = cookies.encrypted[:user_token]
    User.find_or_create_by_token(token, request.remote_ip)
  end
end