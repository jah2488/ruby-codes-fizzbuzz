class Char < ApplicationRecord
  belongs_to :program
  has_many :votes, dependent: :destroy

  validates :name, presence: true

  SPECIAL_CHAR = {
    "[TAB]" => "&nbsp;&nbsp;",
    "[NEW LINE]" => "<br />"
  }.freeze

  def formatted_name
    SPECIAL_CHAR[name] || name 
  end
end
