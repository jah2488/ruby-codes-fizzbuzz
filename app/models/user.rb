class User < ApplicationRecord
  has_many :messages, dependent: :destroy
  
  def self.find_or_create_by_token(token, ip)
    where(token: token).first_or_create do |u|
      u.token = generate_token
      u.ip = ip
    end
  end

  private
  def self.generate_token
    SecureRandom.hex
  end
end