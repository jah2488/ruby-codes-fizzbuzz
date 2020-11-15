class Rack::Attack
  throttle('req/ip', limit: 500, period: 5.minutes) do |req|
    req.ip unless req.path.start_with?('/assets') || req.path.start_with?('/cable')
  end

  throttle('logins/ip', limit: 50, period: 20.seconds) do |req|
    if req.path == '/admin/programs' && req.get?
      req.ip
    end
  end
end