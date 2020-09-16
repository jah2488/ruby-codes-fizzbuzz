class Program < ApplicationRecord
  has_many :chars

  def self.active
    where(complete: false)
  end
end
