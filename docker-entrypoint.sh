>&2 echo "Compiling Frontend Assets..."
cd frontend; npm run build
>&2 echo "Frontend Assets is ready."

echo "-------------------------------------------------------------------------------------------\n"

#Start NGINX
>&2 echo "Starting nginx..."
nginx -g 'daemon off;'
