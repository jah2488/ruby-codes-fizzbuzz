class Char < ApplicationRecord
  belongs_to :program
  has_many :votes, dependent: :destroy
  validates :name, presence: true

  COMMANDS = {
    TAB: ":t",
    NEW_LINE: ":nl",
    BACKSPACE: ":bk",
    SPACE: ":sp",
  }

  SPECIAL_CHAR = {
    COMMANDS[:TAB] => " \t",
    COMMANDS[:NEW_LINE] => " \n",
    COMMANDS[:SPACE] => " "
  }.freeze

  def formatted_name
    SPECIAL_CHAR[name] || name
  end
end
