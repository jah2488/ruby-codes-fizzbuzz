class RemoveUserRelationFromVote < ActiveRecord::Migration[6.0]
  def change
    remove_reference :votes, :user
  end
end
