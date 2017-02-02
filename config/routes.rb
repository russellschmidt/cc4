Rails.application.routes.draw do
  devise_for :users
	root 'dashboard#index'

	resources :donors, only: [ :index, :show ]

	get "angular_test", to: "angular_test#index"
  get "fake_billing", to: "fake_billing#show"

	get '/\*path' => redirect('/?goto=%{path}')
end
