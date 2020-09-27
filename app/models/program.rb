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

  def view
    {
      id: id,
      name: name,
      mode: mode,
      code: code,
      chars: chars.order(votes_count: :desc)
    }
  end
end
