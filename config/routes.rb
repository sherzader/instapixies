Rails.application.routes.draw do
  namespace :api do
    resources :collections, only: [:create, :new, :show]
  end

  root to: "api/collections#new"
end
