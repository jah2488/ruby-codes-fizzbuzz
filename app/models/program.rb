class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars

  def self.active
    where(complete: false)
  end
end
