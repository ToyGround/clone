# Nuber Eats Backend

Nuber Eats Backend

### install

nest setting `nest g apllication project`

graphQL install `@nestjs/graphql graphql-tools graphql apollo-server-express`

class validation `class-validator class-transformer`
app.useGlobalPipes 사용하여 validation

typeorm `yarn add @nestjs/typeorm typeorm pg`

env 환경변수 설정 `@nestjs/config cross-env`
환경 변수를 정의하는 패키지 실정, cross-env는 개발/프로덕션/테스트 모드를 설정해준다.

### error

**eslint error : 파일마다 eslintrc 에러**

현상 : 파일마다 아래와 같은 에러 메세지가 출력됨

`error cannot read config file eslint-config-prettier @typescript-eslint.js`

처리 : @typescript-eslint 버전 업데이트로 인해 설정을 변경해줌 eslintrc.js

**eslint error : eslintrc.js**

현상 : eslintrc.js 파일에서 아래와 같은 에러 메세지가 출력됨

`parsing error: "parserOptions.project" has been set for @typescript-eslint/parser. The file does not match your project config: .eslintrc.js. The file must be included in at least one of the projects provided.`

처리 : 파일이 프로젝트 구성과 달라서 생기는 에러, tsconfig.json 파일에서 `"include": [
"src/**/*",
".eslintrc.js"
]` 를 추가 해주었더니 해당 에러는 생기지 않았다.

참고
레퍼런스 : https://stackoverflow.com/questions/63002127/parsing-error-parseroptions-project-has-been-set-for-typescript-eslint-parser

**events.js:292 throw er; // Unhandled 'error' event**

돌아가는 서버가 포트가 사용중이여서 재실행 할 수 없는 경우이다.

`lsof -i tcp:3000` 현재 포트 확인

`COMMAND  PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME node    6104 jjun   23u  IPv6 0x5b38956416efbbeb      0t0  TCP *:hbci (LISTEN)`

라고 출력되면 6104 를 죽여준다.

`kill -9 6104` 이후 재실행 하면 정상 작동!
