Rails.application.routes.draw do
  devise_for :users
	root 'dashboard#index'

	resources :donors, only: [ :index, :show ]

	get "angular_test", to: "angular_test#index"

	get '/\*path' => redirect('/?goto=%{path}')
end
