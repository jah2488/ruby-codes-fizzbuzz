Rails.application.routes.draw do
  resources :programs, only: :show

  namespace :admin do
    resources :programs
    root to: 'programs#index'
  end

  root 'application#index', as: :home
end
