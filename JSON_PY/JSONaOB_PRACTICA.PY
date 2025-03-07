import json


# some JSON:
x =  '{ "name":"John", "age":30, "city":"New York"}'

# parse x:
y = json.loads(x)

# the result is a Python dictionary:
print(x)
# print(x["age"])error por que python no reconoce un JSON hasta que se convertido a un obketo
print("")
print(y)

print(y["age"])