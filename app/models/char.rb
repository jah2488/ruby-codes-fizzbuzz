class Char < ApplicationRecord
  belongs_to :program
  has_many :char_votes
  has_many :votes, through: :char_votes
end
