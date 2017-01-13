class DonorsController < ApplicationController
	PAGE_SIZE = 10

	def index
		# @page is the user's page of results
		@page = (params[:page] || 0).to_i
		
		if params[:keywords].present?
			@keywords = params[:keywords]
			donor_search_term = DonorSearchTerm.new(@keywords)
			@donors = Donor.where(
					donor_search_term.where_clause,
					donor_search_term.where_args).
				order(donor_search_term.order).
				offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
		else
			@donors = Donor.all.offset(PAGE_SIZE * @page).limit(PAGE_SIZE)
		end
	end
end