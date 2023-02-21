""" Sample database connection for milestone 1 """

import mysql.connector

database = mysql.connector.connect (
    host="team10-database-instance.cobd8enwsupz.us-east-1.rds.amazonaws.com",
    user="scrummy_admin",
    password="GGq2BbBBWqAvBfNw3s4w"
)

cursor = database.cursor()

query = "SELECT * FROM Team10Database.Users;"

cursor.execute(query)

result = cursor.fetchall()

for row in result:
    print(row)
