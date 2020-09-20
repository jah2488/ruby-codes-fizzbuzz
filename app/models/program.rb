class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars, dependent: :destroy
  
  validates :name, presence: true

  VOTE_THRESHOLD = {
    "Anarchy" => 1,
    "Democracy" => 5
  }.freeze

  def self.active
    where(complete: false)
  end
end
