class User < ApplicationRecord
  def self.generate_token
    SecureRandom.hex
  end
end