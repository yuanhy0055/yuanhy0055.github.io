#!/usr/bin/env python
# coding=UTF-8

print("学习Lambda")

AA = list(map( lambda x: x*x, [y for y in range(10)] ))

print(type(AA))
print(AA)

print("好过如下写法：")