class Entry < ApplicationRecord
  belongs_to :program

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

  def self.formatted_name(addition)
    SPECIAL_CHAR[addition] || addition
  end
end
