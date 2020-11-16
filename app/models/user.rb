require 'color-generator'
class User < ApplicationRecord
  has_many :messages, dependent: :destroy
  
  def self.find_or_create_by_token(token, ip)
    where(token: token).first_or_create do |u|
      u.token = generate_token
      u.color = generate_color(u.token)
      u.ip = ip
    end
  end

  private
  def self.generate_token
    SecureRandom.hex
  end

  def self.generate_color(token)
    seed = token.gsub(/[^\d]*/, '').to_i
    '#' + ColorGenerator.new(saturation: 0.4, lightness: 0.75, seed: seed).create_hex
  end
end