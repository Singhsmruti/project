import csv

f=open('data.csv', 'r')
reader=list(csv.reader(f))

print(list(reader))
for i in (reader):
    i[2]= float(i[2].replace("$","")) *83
remove_ele=[]
for i in range(len(reader)):
    for j in range(i+1,len(reader)):
        if reader[i][1].replace('"',"").replace("'","").strip() == reader[j][1].strip() and reader[i][2]==reader[j][2]:
            remove_ele.append(j)

remove_ele= list(set(remove_ele))
remove_ele.sort(reverse=True)

for i in remove_ele:
    reader.pop(i)

print(reader)
""""""""""""
f=open('data.csv', 'r')
reader=list(csv.reader(f))

print(list(reader))

    
jsonfile=[]
idm=[]
nam=[]
prc=[]
for i in range(len(reader)):
    id= int(reader[i][0].strip())
    name=reader[i][1].replace('"',"").replace("'","").strip()
    price= float(reader[i][2].replace("$","")) *83
    cont=reader[i][3].strip()
    
    if name in nam and price in prc:
        continue
    else :
        idm.append(id)
        nam.append(name)
        prc.append(price)
        jsonfile.append(
            { "id":id,
            "name":name,
            "price":price,
            "contry" :cont            
            }
        )

print(jsonfile)

