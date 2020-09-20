class Vote < ApplicationRecord
  belongs_to :char, counter_cache: true
end
