# 최신 마이그레이션 진행

- 마이그레이션을 진행하면 자동으로 테이블 생성 됌.
- model로 테이블을 생성하는 로직을 구현할 수 있지만, 기록을 남기지 않아 권장하지 않는 패턴.

```bash
npx sequelize-cli db:migrate
```

# 명령어로 시더 채우기

## 시더 채우기(insert)

```bash
npx sequelize-cli db:seed:all
```

## 시더 비우기

```bash
npx sequelize-cli db:seed:undo:all
```

## 가장 최근 시더 한 건 롤백

```bash
npx sequelize-cli db:seed:undo
```

# dicom-dimse-native 설치 환경

- brew install cmake
- brew install g++
- node 18.20.4
- pnpm @9
