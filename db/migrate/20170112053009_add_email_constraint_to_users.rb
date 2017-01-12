class AddEmailConstraintToUsers < ActiveRecord::Migration[5.0]
  def up
  	execute %{
  		ALTER TABLE users
  		ADD CONSTRAINT email_must_be_valid_format
  		CHECK ( email ~* '^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,63}$')
  	}
  end

  def down
  	execute %{
  		ALTER TABLE users
  		DROP CONSTRAINT email_must_be_valid_format
  	}
  end
end
