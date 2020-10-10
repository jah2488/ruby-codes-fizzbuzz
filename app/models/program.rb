class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars, dependent: :destroy
  has_many :messages, dependent: :destroy
  validates :name, presence: true
  before_save -> () do
    if settings.empty?
      self.settings = { play_state: "created" }
    end
  end

  VOTE_THRESHOLD = {
    "anarchy" => 1,
    "democracy" => 5
  }.freeze

  def self.active
    where(complete: false)
  end

  def evaluate
    #✔️ 1) clean/sanitize code sample to remove potential security issues.
    #✔️ 2) run code in a separate process/thread.
    #✔️ 3) capture output from code sample.
    #✔️ 4) return captured output.
    # 5) determine if output is correct?
      # - 5a) Each program should have a set of test criteria that we are testing against.
      # - 5b) It could be either a simple string, or code to be evaluated _against_ the code provided. ie a test suite or just an answer.
  end

  def playing?
    settings["play_state"] == "playing"
  end

  def tick_view
    {
      id: id,
      name: name,
      mode: mode,
      code: code,
      tick: tick,
      settings: settings
    }
  end

  def view
    {
      id: id,
      name: name,
      mode: mode,
      code: code,
      chars: chars
        .select(:id, :name, :votes_count)
        .order(votes_count: :desc),
      messages: messages
        .select(:id, :name, :is_code, :user_id)
        .order(created_at: :desc)
        .limit(50)
        .reverse,
      tick: tick,
      settings: settings
    }
  end
end
