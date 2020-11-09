FROM thanhnv151198/crm-be-env:latest

USER root

COPY . .

RUN npm install --unsafe-perm 

CMD ["npm", "run","start:prod"]