#!/usr/bin/env python2
# -*- coding: utf-8 -*-
##################################################
# GNU Radio Python Flow Graph
# Title: Simple RF Tracker
# Author: Flynn
# Description: Lisen to a target frequency, and return the gain of the signal through ZEROMQ
# Generated: Tue Nov 10 12:16:38 2020
##################################################


from gnuradio import eng_notation
from gnuradio import filter
from gnuradio import gr
from gnuradio.eng_option import eng_option
from gnuradio.fft import logpwrfft
from gnuradio.filter import firdes
from optparse import OptionParser
import SimpleXMLRPCServer
import grc_pyblock_send_gain
import osmosdr
import threading
import time


class gnuradio_freq_listener(gr.top_block):

    def __init__(self):
        gr.top_block.__init__(self, "Simple RF Tracker")

        ##################################################
        # Variables
        ##################################################
        self.sampRate = sampRate = 2000000
        self.gain = gain = 10
        self.freq = freq = 868000000
        self.bandwidth = bandwidth = 200000

        ##################################################
        # Blocks
        ##################################################
        self.xmlrpc_server_0 = SimpleXMLRPCServer.SimpleXMLRPCServer(('localhost', 9090), allow_none=True)
        self.xmlrpc_server_0.register_instance(self)
        self.xmlrpc_server_0_thread = threading.Thread(target=self.xmlrpc_server_0.serve_forever)
        self.xmlrpc_server_0_thread.daemon = True
        self.xmlrpc_server_0_thread.start()
        self.osmosdr_source_0 = osmosdr.source( args="numchan=" + str(1) + " " + 'rtl=0' )
        self.osmosdr_source_0.set_sample_rate(sampRate)
        self.osmosdr_source_0.set_center_freq(freq, 0)
        self.osmosdr_source_0.set_freq_corr(0, 0)
        self.osmosdr_source_0.set_dc_offset_mode(2, 0)
        self.osmosdr_source_0.set_iq_balance_mode(2, 0)
        self.osmosdr_source_0.set_gain_mode(False, 0)
        self.osmosdr_source_0.set_gain(gain, 0)
        self.osmosdr_source_0.set_if_gain(20, 0)
        self.osmosdr_source_0.set_bb_gain(20, 0)
        self.osmosdr_source_0.set_antenna('', 0)
        self.osmosdr_source_0.set_bandwidth(0, 0)

        self.low_pass_filter_0 = filter.fir_filter_ccf(1, firdes.low_pass(
        	1, sampRate, bandwidth, int(bandwidth/8), firdes.WIN_HAMMING, 6.76))
        self.logpwrfft_x_0 = logpwrfft.logpwrfft_c(
        	sample_rate=sampRate,
        	fft_size=1024,
        	ref_scale=2,
        	frame_rate=30,
        	avg_alpha=1.0,
        	average=True,
        )
        self.grc_pyblock_send_gain = grc_pyblock_send_gain.blk()



        ##################################################
        # Connections
        ##################################################
        self.connect((self.logpwrfft_x_0, 0), (self.grc_pyblock_send_gain, 0))
        self.connect((self.low_pass_filter_0, 0), (self.logpwrfft_x_0, 0))
        self.connect((self.osmosdr_source_0, 0), (self.low_pass_filter_0, 0))

    def get_sampRate(self):
        return self.sampRate

    def set_sampRate(self, sampRate):
        self.sampRate = sampRate
        self.osmosdr_source_0.set_sample_rate(self.sampRate)
        self.low_pass_filter_0.set_taps(firdes.low_pass(1, self.sampRate, self.bandwidth, int(self.bandwidth/8), firdes.WIN_HAMMING, 6.76))
        self.logpwrfft_x_0.set_sample_rate(self.sampRate)

    def get_gain(self):
        return self.gain

    def set_gain(self, gain):
        self.gain = gain
        self.osmosdr_source_0.set_gain(self.gain, 0)

    def get_freq(self):
        return self.freq

    def set_freq(self, freq):
        self.freq = freq
        self.osmosdr_source_0.set_center_freq(self.freq, 0)

    def get_bandwidth(self):
        return self.bandwidth

    def set_bandwidth(self, bandwidth):
        self.bandwidth = bandwidth
        self.low_pass_filter_0.set_taps(firdes.low_pass(1, self.sampRate, self.bandwidth, int(self.bandwidth/8), firdes.WIN_HAMMING, 6.76))


def main(top_block_cls=gnuradio_freq_listener, options=None):

    tb = top_block_cls()
    tb.start()
    try:
        raw_input('Press Enter to quit: ')
    except EOFError:
        pass
    tb.stop()
    tb.wait()


if __name__ == '__main__':
    main()
