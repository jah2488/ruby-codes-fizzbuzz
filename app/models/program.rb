class Program < ApplicationRecord
  attr_accessor :addition

  has_many :chars, dependent: :destroy
  has_many :entries, dependent: :destroy
  has_many :messages, dependent: :destroy
  validates :name, presence: true

  before_save -> () do
    if settings.empty?
      self.settings = {
        play_state: "created",
        max_input_mode: 5,
        can_vote: false,
        vote_interval: VOTE_THRESHOLD[mode],
        vote_threshold: VOTE_THRESHOLD[mode],
        confetti: false,
        debounce_interval: 1
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
    self.active.where(mode: "Democracy").where("settings ->> 'play_state' = :state", state: "playing")
  end

  def anarchy?
    mode.downcase == "anarchy"
  end
 
  def playing?
    settings["play_state"] == "playing"
  end
  
  def code
    entries.order(id: :asc).pluck(:name).join
  end

  def evaluate
    # TODO) determine if output is correct?
      # - 1) Each program should have a set of test criteria that we are testing against.
      # - 2) It could be either a simple string, or code to be evaluated _against_ the code provided. ie a test suite or just an answer.
    resp = CodeEvaluator.new(self.code).process
    ostr = ''
    erln = nil
    return '' if resp.output.blank? && resp.error.blank?
    if resp.output.blank?
      ostr += 'No output'
    else
      ostr += "STDOUT:\n"
      resp.output.chars.each_slice(58).map(&:join).map do |line|
        ostr += line
      end
    end
    ostr += "\n\n"
    if resp.error.blank?
      ostr += 'No Errors'
    else
      erln = resp.error.scan(/^-e:([0-9]+):/)&.first&.first
      ostr += "STDERR:\n"
      resp
        .error
        .gsub(/^-e:([0-9]+):(in `<main>':)* (.*)/, '\3 (found on line \1)')
        .chars
        .each_slice(60).map(&:join).map do |line|
        ostr += "#{line}\n"
      end
    end

    { raw: ostr, err_ln: erln }
  end

  def process_addition(addition)
    case addition
    when Entry::COMMANDS[:BACKSPACE] then entries.last && entries.last.destroy
    else
      entries.create(name: Entry.formatted_name(addition))
    end
  end


  def admin_view
    {
      mode: mode,
      settings: settings,
      tick: tick
    }
  end

  def tick_view
    {
      chars: chars_data,
      tick: tick
    }
  end

  def view
    {
      id: id,
      name: name,
      code: code,
      chars: chars_data,
      tick: tick
    }
  end

  def message_view
    {
      messages: messages_data
    }
  end

  def init_view
    {
      id: id,
      name: name,
      code: code,
      chars: chars_data,
      messages: messages_data,
      tick: tick,
      mode: mode,
      settings: settings
    }
  end

  private

  def chars_data
    chars.select(:id, :name, :votes_count).order(id: :asc)
  end

  def messages_data
    messages
      .select(:id, :name, :is_code, :token, :color)
      .order(created_at: :desc)
      .limit(25)
  end
end
