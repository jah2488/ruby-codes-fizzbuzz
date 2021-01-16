require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  
  resources :programs, only: [:show, :update] do
    member do
      put :clear
    end
  end

  namespace :admin do
    resources :programs
    root to: 'programs#index'
  end

  root 'application#index', as: :home
end
