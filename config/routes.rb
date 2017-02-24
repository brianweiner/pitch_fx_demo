Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "application#index"

  resources :pitchers, only: [] do 
    post 'events', to: 'pitch_events#show'
  end
end
