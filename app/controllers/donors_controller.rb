class DonorsController < Application Controller
	def index
		@donors = Donor.all.limit(10)
	end
end

