class ProgramsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    program = Program.find(params.fetch(:id))

    render json: program.init_view and return if request.headers["HTTP_RESPONSE_TYPE"] == "json"

    cookies[:user_token] = current_user.token

    render :show, locals: {
      program: program
    }
  end

  private
  def current_user
    @current_user ||= User.find_or_create_by_token(cookies[:user_token], request.remote_ip)
  end
end