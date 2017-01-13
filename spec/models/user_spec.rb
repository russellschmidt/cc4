require 'rails_helper'

describe User do
	describe "email" do
		let(:user) {
			User.create!(email: "eatshit@yahoo",
									password: "qwerty123",
									password_confirmation: "qwerty123",
									)
		}
		it "prevents invalid email addresses with no tld extension" do
			expect {
				user.update_attribute(:email, "eatshit@yahoo")
			}.to raise_error(ActiveRecord::RecordInvalid, 
				/Email is invalid/i)
		end
	end
end
