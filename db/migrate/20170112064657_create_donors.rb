class CreateDonors < ActiveRecord::Migration[5.0]
  def change
    create_table :donors do |t|
      t.string :first_name, null: false
      t.string :last_name,  null: false
      t.string :email,      null: false
      t.string :username,   null: false
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :postal
      t.string :phone_home
      t.string :phone_mobile

      t.timestamps
    end
  end
end
