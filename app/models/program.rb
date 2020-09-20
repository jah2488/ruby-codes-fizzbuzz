class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars
  accepts_nested_attributes_for :chars
  
  def self.active
    where(complete: false)
  end
end
