class Char < ApplicationRecord
  belongs_to :program
  has_many :votes, dependent: :destroy

  validates :name, presence: true

  SPECIAL_CHAR = {
    "[TAB]" => "\t",
    "[NEW LINE]" => "\n"
  }.freeze

  def formatted_name
    SPECIAL_CHAR[name] || name
  end
end
