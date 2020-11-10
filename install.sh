sudo apt-get update

# GNU Radio

sudo apt-get install -f gnuradio
sudo apt install -f gr-osmosdr

# gr-iio
#sudo apt install libxml2 libxml2-dev bison flex cmake git libaio-dev libboost-all-dev
#sudo apt install libusb-1.0-0-dev libavahi-common-dev libavahi-client-dev
#sudo apt install bison flex cmake git libgmp-dev swig

#git clone https://github.com/analogdevicesinc/libiio.git
#cd libiio
#cmake .
#make 
#sudo make install
#cd ..

#git clone https://github.com/analogdevicesinc/libad9361-iio.git
#cd libad9361-iio
#cmake .
#make 
#sudo make install
#cd ..

#git clone https://github.com/analogdevicesinc/gr-iio.git
#cd gr-iio
#cmake .
#make 
#sudo make install
#cd ..
#sudo ldconfig

#sudo cp -r /usr/local/lib/python2.7/dist-packages/gnuradio/iio /usr/lib/python2.7/dist-packages/gnuradio/


# NPM
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)

# Node red palette
sudo npm install -g node-red-contrib-zeromq
sudo npm install -g node-red-contrib-xmlrpc

# Dependances NODE
npm install 
