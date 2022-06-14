#This code is so I don't have to manually convert the case data from an array to json
#Kept because ithkapp is a school project and I might need to show it
"""
basically,

"abc":"def","ghi":"jkl"

to

"abc":{
    "name":"def",
    "desc":"N/A"
},
"ghi":{
    "name":"jkl",
    "desc":"N/A"
}
"""
while True:
    inp = input("> ")
    for i in inp.split(","):
        isp = i.split(":")
        print(isp[0]+":{")
        print('    "name":'+isp[1]+",")
        print('    "desc":"N/A"')
        print("},")
