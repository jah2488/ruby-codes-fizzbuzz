Rails.application.routes.draw do
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
