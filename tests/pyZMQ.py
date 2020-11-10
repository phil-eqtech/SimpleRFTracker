import time
import zmq

def producer():
  context = zmq.Context()
  zmq_socket = context.socket(zmq.PUSH)
  zmq_socket.bind("tcp://127.0.0.1:5050")
  work_msg  ={"Hello":"World"}
  zmq_socket.send_json(work_msg)
  zmq_socket.send(b"HOLA")

producer()
