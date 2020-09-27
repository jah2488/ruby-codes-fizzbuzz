Rails.application.routes.draw do
  put "programs/:id/clear", to: "programs#clear"
  resources :programs, only: [:show, :update]

  namespace :admin do
    resources :programs
    root to: 'programs#index'
  end

  root 'application#index', as: :home
end
