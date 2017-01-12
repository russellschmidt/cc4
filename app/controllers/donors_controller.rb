class DonorsController < ApplicationController
	def index
		@donors = Donor.all.limit(10)
	end
end

