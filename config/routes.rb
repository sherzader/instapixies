Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :collections, only: [:create, :show, :update]
  end

  root to: "static_pages#root"
end
