class Char < ApplicationRecord
  belongs_to :program
  has_many :votes, dependent: :destroy

  validates :name, presence: true

  SPECIAL_CHAR = {
    "&nbsp;&nbsp;" => "[TAB]",
    "<br />" => "[NEW LINE]"
  }.freeze

end
