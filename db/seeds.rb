# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

350_000.times do |i|
	Donor.create!(
		first_name: Faker::Name.first_name,
		last_name: 	Faker::Name.last_name,
		username:  	"#{Faker::Internet.user_name}#{i}",
		email: 			Faker::Internet.user_name + i.to_s + "@#{Faker::Internet.domain_name}",
		address1: 	Faker::Address.street_address,
		address2: 	Faker::Address.secondary_address,
		city:   		Faker::Address.city,	
		state: 			Faker::Address.state_abbr,
		postal: 		Faker::Address.zip,
		phone_home: 	Faker::PhoneNumber.phone_number,
		phone_mobile: 	Faker::PhoneNumber.cell_phone

		)
end