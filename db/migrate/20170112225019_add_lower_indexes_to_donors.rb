class AddLowerIndexesToDonors < ActiveRecord::Migration[5.0]
  def up
  	execute %{
  		CREATE INDEX donors_lower_last_name
  		ON donors (lower(last_name) varchar_pattern_ops)
  	}
  	execute %{
  		CREATE INDEX donors_lower_first_name
  		ON donors (lower(first_name) varchar_pattern_ops)
  	}
  	# not using the operator class bc its an exact match
  	# we will want to change this for partial matches
  	execute %{
  		CREATE INDEX donors_lower_email
  		ON donors (lower(email))
  	}
  end

  def down
  	execute %{
  		remove_index :donors, name: 'donors_lower_last_name'
  		remove_index :donors, name: 'donors_lower_first_name'
  		remove_index :donors, name: 'donors_lower_email'
  	}
  end
end
