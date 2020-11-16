source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '~> 6.0', '>= 6.0.3.2'
gem 'pg', '~> 1.2', '< 2.0'
gem 'puma', '~> 4.3'
gem 'sass-rails', '~> 6.0'
gem 'webpacker', '~> 4.3'
gem 'redis', '~> 4.2'
gem 'bcrypt', '~> 3.1'
gem 'bootsnap', '~> 1.4', require: false
gem 'color-generator'
gem 'rack-timeout'
gem 'rack-cors'
gem 'rack-attack'
gem 'barnes'
gem 'newrelic_rpm'

group :development, :test do
  gem 'pry-rails', "~> 0.3"
  gem 'rspec-rails', "~> 4.0"
end

group :development do
  gem 'web-console', '~> 4.0'
  gem 'listen', '~> 3.2'
  gem 'spring', "~> 2.1"
  gem 'spring-watcher-listen', '~> 2.0'

  gem 'derailed_benchmarks'
  gem 'rack-mini-profiler', "~> 2.1", require: false
  gem 'memory_profiler', "~> 0.9"
  gem 'flamegraph', "~> 0.9"
  gem 'stackprof', "~> 0.2"
end
