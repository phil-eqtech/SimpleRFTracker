"""
Embedded Python Blocks:

En entree ce bloc recupere un tableau des puissances du signal (IQ) au format "vector"
pour ne retourner que le int de la valeur la plus elevee via le protocole ZMQ
"""

import numpy as np
from gnuradio import gr
import zmq

class blk(gr.sync_block):  # other base classes are basic_block, decim_block, interp_block
    """Embedded Python Block example - a simple multiply const"""

    def __init__(self):  # only default arguments here
        """arguments to this function show up as parameters in GRC"""
        gr.sync_block.__init__(
            self,
            name='Embedded Python Block',   # will show up in GRC
            in_sig=[(np.float32,1024)],
            out_sig=[]
        )
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.PUSH)
        self.socket.connect("tcp://127.0.0.1:5050")
        
    def work(self, input_items, output_items):
        """example: multiply with constant"""
        gain = sorted(input_items[0][0], reverse = True)
        self.socket.send_json({"gain":int(gain[0])})
        return True