class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars, dependent: :destroy
  has_many :messages, dependent: :destroy
  validates :name, presence: true

  enum max_input_mode: { char: 0, word: 1, line: 2 }

  before_save -> () do
    if settings.empty?
      self.settings = {
        play_state: "created",
        max_input_mode: Program.max_input_modes["word"],
        vote_interval: VOTE_THRESHOLD[mode],
        vote_threshold: VOTE_THRESHOLD[mode]
      }
    end
  end
  
  VOTE_THRESHOLD = {
    "Anarchy" => 0,
    "Democracy" => 3
  }.freeze

  def self.active
    where(complete: false)
  end

  def self.running
    self.active.where("settings ->> 'play_state' = :state", state: "playing")
  end


  def evaluate
    # TODO) determine if output is correct?
      # - 1) Each program should have a set of test criteria that we are testing against.
      # - 2) It could be either a simple string, or code to be evaluated _against_ the code provided. ie a test suite or just an answer.
    Rails.cache.fetch("#{self.id}-#{self.code.length}") do
      ce = CodeEvaluator.new(self.code).process
      "#{ce.output}\n#{ce.error}"
    end
  end

  def formatted_code(char)
    case char.name
    when "[BACKSPACE]" then handle_backspace
    else
      handle_addition(char)
    end
  end

  def handle_addition(char)
    "#{code} #{char.formatted_name}"
  end

  def handle_backspace
    delimiter = case settings["max_input_mode"]
    when Program.max_input_modes["char"] then ""
    when Program.max_input_modes["word"] then " "
    when Program.max_input_modes["line"] then "\n"
    else
      ""
    end
    # split(//, -1) is necessary to prevent over-deletion when the last character is a new-line
    code.split(/#{delimiter}/, -1)[0..-2].join("#{delimiter}")
  end

  def playing?
    settings["play_state"] == "playing"
  end

  def tick_view(current_user=nil)
    {
      id: id,
      name: name,
      mode: mode,
      code: code,
      tick: tick,
      settings: settings,
      current_user_id: current_user && current_user.id
    }
  end

  def view(current_user=nil)
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
      settings: settings,
      current_user_id: current_user && current_user.id
    }
  end
end
