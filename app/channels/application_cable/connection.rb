module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
    end

    private
    def find_user
      if user = User.find_by(token: cookies.encrypted[:user_token])
        user
      else
        token = User.generate_token
        cookies.encrypted[:user_token] = token
        User.create(token: User.generate_token, ip: request.remote_ip)
      end
    end
  end
end
