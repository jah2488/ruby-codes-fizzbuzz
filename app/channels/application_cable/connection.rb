module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
    end

    private
    def find_user
      token = request.cookies["user_token"]
      User.find_or_create_by_token(token, request.remote_ip)
    end
  end
end
