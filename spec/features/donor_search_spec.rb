require 'rails_helper'

feature "Donor Search" do
	let(:email) 		{ "bob@example.com" }
	let(:password)	{ "password123" }

	before do 
		User.create!(email: email,
									password: password,
									password_confirmation: password)

		create_donor first_name: "Robert", last_name: "Aaron"
		create_donor first_name: "Bob", last_name: "Johnson"
		create_donor first_name: "JR", last_name: "Bob"
		create_donor first_name: "Bobby", last_name: "Dobbs"
		create_donor first_name: "Bob", last_name: "Jones", email: "bob123@somewhere.net"

		visit "/donors"
		# fill_in "Email", with: "bob@example.com"
		# fill_in "Password", with: "password123"
		# click_button "Log in"
	end

	scenario "Search by Name" do
		within "section.search-form" do
			fill_in "keywords", with: "bob"
		end

		within "section.search-results" do
			expect(page).to have_content("Results")
			expect(page.all("ol li.list-group-item").count).to eq(4)

			expect(page.all("ol li.list-group-item")[0]).to have_content("JR")
			expect(page.all("ol li.list-group-item")[0]).to have_content("Bob")

			expect(page.all("ol li.list-group-item")[3]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[3]).to have_content("Jones")
		end
	end

	scenario "Search by Email" do 
		within "section.search-form" do
			fill_in "keywords", with: "bob123@somewhere.net"
		end

		within "section.search-results" do
			expect(page).to have_content("Results")
			expect(page.all("ol li.list-group-item").count).to eq(4)

			expect(page.all("ol li.list-group-item")[0]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[0]).to have_content("Jones")

			expect(page.all("ol li.list-group-item")[1]).to have_content("JR")
			expect(page.all("ol li.list-group-item")[1]).to have_content("Bob")

			expect(page.all("ol li.list-group-item")[3]).to have_content("Bob")
			expect(page.all("ol li.list-group-item")[3]).to have_content("Johnson")
		end
	end
 
	def create_donor(first_name: nil, 
		last_name: nil, 
		email: nil,
		username: nil,
		address1: nil,
		address2: nil,
		city: nil,
		state: nil,
		postal: nil,
		phone_home: nil,
		phone_mobile: nil)

		user_lucky_number = rand(1000)
		first_name ||= 	Faker::Name.first_name
		last_name ||= 	Faker::Name.last_name
		email ||= 			"#{first_name}#{user_lucky_number}@#{Faker::Internet.domain_name}"
		username ||= 		"#{first_name}#{user_lucky_number}"
		address1 ||= 		Faker::Address.street_address
		address2 ||= 		Faker::Address.secondary_address
		city ||=   			Faker::Address.city
		state ||=				Faker::Address.state_abbr
		postal ||= 			Faker::Address.zip
		phone_home ||= 	Faker::PhoneNumber.phone_number
		phone_mobile ||= 	Faker::PhoneNumber.cell_phone
	
		Donor.create!(
			first_name: first_name,
			last_name: 	last_name,
			email:  		email,
			username: 	username,
			address1: 	address1,
			address2: 	address2,
			city: 			city,
			state: 			state,
			postal:  		postal,
			phone_home: phone_home,
			phone_mobile: phone_mobile
		)
	end
end