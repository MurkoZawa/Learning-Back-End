**Imposta nuovo repo Git:**

git init

git remote add origin https://github.com/MurkoZawa/\[...]

git remote set-url origin https://github.com/MurkoZawa/\[...]

git branch -M main

git add .

git commit -m "\[…]"

git push -u origin main (che poi diventerà solo git push)



**Avvia server:**

node server.js



**Aggiungi task:**

curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\\"name\\":\\"Testo\\",\\"description\\":\\"Testo\\"}"

