
# print('hello!')
import sys
import time
# print('hello!')
# print(len(sys.argv))
n1 = float(sys.argv[1])
n2 = float(sys.argv[2])
op = sys.argv[3]


op_dict = {
        'addition'       : lambda a, b : a + b,
        'subtraction'    : lambda a, b : a - b,
        'multiplication' : lambda a, b : a * b,
        'division'       : lambda a, b : a / b
}

if op in op_dict:
	print(op_dict[op](n1, n2))
else:
	print('undefined')

