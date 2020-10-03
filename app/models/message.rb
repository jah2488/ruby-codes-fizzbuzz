class Message < ApplicationRecord
  belongs_to :program
  belongs_to :user

  validates :name, presence: true
end
