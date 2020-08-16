
>&2 echo "Run Database migrations"
python /code/manage.py migrate

echo "-------------------------------------------------------------------------------------------\n"

>&2 echo "Installing frontend dependencies..."
(cd frontend; npm install)
>&2 echo "Dependencies installed"
echo "-------------------------------------------------------------------------------------------\n"
>&2 echo "Compiling Frontend Assets..."
(cd frontend; npm run build)
>&2 echo "Frontend Assets is ready."
echo "-------------------------------------------------------------------------------------------\n"

#Start NGINX
# >&2 echo "Starting nginx..."
# nginx -g 'daemon off;'

#Start django dev server
>&2 echo "Starting Django runserver..."
python /code/manage.py runserver 0.0.0.0:8000
