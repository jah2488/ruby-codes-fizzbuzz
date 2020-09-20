class AddVotesCountToChar < ActiveRecord::Migration[6.0]
  def change
    add_column :chars, :votes_count, :integer
  end
end
