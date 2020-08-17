echo "-------------------------------------------------------------------------------------------\n"

# >&2 echo "Installing frontend dependencies..."
# (cd frontend; npm install)
# >&2 echo "Dependencies installed"
# echo "-------------------------------------------------------------------------------------------\n"
# >&2 echo "Compiling Frontend Assets..."
# (cd frontend; npm run build)
# >&2 echo "Frontend Assets is ready."
# echo "-------------------------------------------------------------------------------------------\n"

echo "-------------------------------------------------------------------------------------------\n"
>&2 echo "Create relevant directories"
# mkdir -p "/code/DATA/converted/"
# mkdir -p "/code/DATA/input/"
# mkdir -p "/code/DATA/temp/"
>&2 echo "Relevant directories created"
echo "-------------------------------------------------------------------------------------------\n"

>&2 echo "Wait for database to startup"

# Check if databse is up (active)
TRY_CONNECT=30
>&2 echo "Checking if the database is ready and active..."
while ! pg_isready -h db -p 5432 > /dev/null 2>&1; do
	if [ $TRY_CONNECT -eq 0 ]; then
		>&2 echo "Error connecting to the database. Verify that the database exists and if it is available for connections."
		sleep infinity
	else
	    >&2 echo "Database is not ready or not activated yet."
	    sleep 1
	    TRY_CONNECT=$((TRY_CONNECT-1))
	    >&2 echo "Trying again. Try's number: $TRY_CONNECT"
	fi
done
>&2 echo "Database is active and ready."
echo "-------------------------------------------------------------------------------------------\n"



>&2 echo "Run Database migrations"
python /code/manage.py migrate

echo "-------------------------------------------------------------------------------------------\n"

#Start NGINX
# >&2 echo "Starting nginx..."
# nginx -g 'daemon off;'

#Start django dev server
>&2 echo "Starting Django runserver..."
python /code/manage.py runserver 0.0.0.0:8000
