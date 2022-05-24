sudo rm -r front-end/node_modules && echo "node_modules removed"
sudo rm -r front-end/certbot && echo "certbot removed"
sudo rm -r front-end/nginx/logs && echo "logs removed"
sudo rm -r front-end/.parcel-cache && echo "parcel-cache removed"
sudo rm -r front-end/dist && echo "dist removed"

sudo rm -r back-end/node_modules && echo "node_modules removed"

sudo rm -r react-dashboard/node_modules && echo "node_modules removed"
sudo rm -r react-dashboard/certbot && echo "certbot removed"
sudo rm -r react-dashboard/nginx/logs && echo "logs removed"
sudo rm -r react-dashboard/.parcel-cache && echo "parcel-cache removed"
sudo rm -r react-dashboard/dist && echo "dist removed"
sudo rm -r react-dashboard/build && echo "build removed"

sudo rm -r reverse-proxy/logs/* && echo "logs removed"

sudo rm -r data-base && echo "data-base removed"