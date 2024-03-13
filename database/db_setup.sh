#!/bin/bash

# Check if PostgreSQL is already installed
if dpkg -l | grep -q "postgresql-16"; then
    echo "PostgreSQL-16 is already installed. Moving on..."
else
    # Install PostgreSQL 16
    sudo apt-get update
    sudo apt-get install -y postgresql-16
fi

# Prompt user for role and database names
read -p "Enter PostgreSQL role name: " role_name
read -p "Enter PostgreSQL role password: " role_password
read -p "Enter PostgreSQL database name: " db_name

# Check if role already exists
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$role_name'" | grep -q 1; then
    echo "Role '$role_name' already exists. Exiting..."
    exit 1
fi

# Check if database already exists
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$db_name"; then
    echo "Database '$db_name' already exists. Exiting..."
    exit 1
fi

# Switch to the PostgreSQL superuser and create a role
sudo -u postgres psql -c "CREATE ROLE $role_name WITH CREATEDB LOGIN PASSWORD '$role_password' ;"

# Create a database
sudo -u postgres createdb $db_name

# Grant permissions to the role on the new database
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $db_name TO $role_name;"

echo "PostgreSQL setup completed. Role '$role_name' has been created with createdb attributes, and database '$db_name' has been created with admin permissions for the role."