**Imposta nuovo repo Git:**

git init

git remote add origin https://github.com/MurkoZawa/\[...]

git remote set-url origin https://github.com/MurkoZawa/\[...]

git branch -M main

git add .

git commit -m "\[…]"

git push -u origin main (che poi diventerà solo git push)



**Modifica commit:**

git rebase -i HEAD~2 (o quanti commit vuoi modificare)

premi i

dove c'è *pick* cambia con *squash* per unire o con *drop* per eliminare

premi ESC

premi :wq due volte

git push origin main --force



**Avvia server:**

node server.js (se non hai implementato ancora Docker)

docker compose up (--build se hai fatto modifiche ai dockerfile)

