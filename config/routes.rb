Rails.application.routes.draw do
  resources :programs, only: [:show, :update]
  put "programs/:id/clear", to: "programs#clear"

  namespace :admin do
    resources :programs
    root to: 'programs#index'
  end

  root 'application#index', as: :home
end
