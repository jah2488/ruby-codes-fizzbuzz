class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars, dependent: :destroy
  has_many :messages, dependent: :destroy
  
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
      chars: chars
        .select(:id, :name, :votes_count)
        .order(votes_count: :desc),
      messages: messages
        .select(:id, :name, :is_code, :user_id)
        .order(created_at: :desc)
        .limit(50)
        .reverse
    }
  end
end
