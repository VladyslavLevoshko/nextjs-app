npm audit
After run this command you see output: 13 vulnerabilities (6 moderate, 7 high);
I try to fix it by changing version to 6.19.2 as npm advice me, но это приводило к другим проблемам с версиями. Ошибки от hono я проигнорировал т.к. 
wd1@0.1.0 /home/vladyslav/Documents/Projects/web_deploy/wd1
└─┬ prisma@7.4.2
  └─┬ @prisma/dev@0.20.0
    ├─┬ @hono/node-server@1.19.9
    │ └── hono@4.11.4 deduped
    └── hono@4.11.4
