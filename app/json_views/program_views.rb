class ProgramViews
  attr_reader :model
  def initialize(program)
    pp "*" * 100
    pp "*" * 100
    @model = program
  end

  def call
    {
      id: model.id,
      name: model.name,
      code: model.code,
      chars: model.chars
        .select(:id, :name, :votes_count)
        .order(id: :asc),
      messages: messages,
      tick: model.tick
    }
  end

  def start
    {
      id: model.id,
      name: model.name,
      code: model.code,
      chars: model.chars
        .select(:id, :name, :votes_count)
        .order(id: :asc),
      messages: messages,
      tick: model.tick,
      mode: model.mode,
      settings: model.settings
    }
  end

  def tick
    {
      id: model.id,
      name: model.name,
      mode: model.mode,
      settings: model.settings,
      code: model.code,
      messages: messages,
      chars: model.chars
        .select(:id, :name, :votes_count)
        .order(id: :asc),
      tick: model.tick
    }
  end

  def message
    {
      id: model.id,
      name: model.name,
      code: model.code,
      chars: model.chars
        .select(:id, :name, :votes_count)
        .order(id: :asc),
      messages: messages
    }
  end

  private
  def messages
    model
    .messages
      .joins(:user)
      .select(:id, :name, :is_code, :token, :color)
      .order(created_at: :desc)
      .limit(50)
      .reverse
  end
end