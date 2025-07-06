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

# startStoreScp callback

- 실행되지 않는다.

# vr type invalid

- Dicom VR 타입이 정의되지 않을 경우 발생하는 Warning.
- dcmjs에서 자동 fallback 처리 해줌

```bash
Invalid vr type xs - using US
Invalid vr type xs - using US
Invalid vr type ox - using OW
```

# dcmjs d.ts 파일 생성

- dcmjs에서 d.ts 파일을 제공해주지 않아 type 추론이 어렵다.
- 아쉬운 상황이지만 dts-gen 으로 any 타입 추론하는 것으로 대체한다.
- d.ts 파일이 존재하지 않으면, install 전단계에 생성한다.

```json
{
  "script": {
    "preinstall": "[ -f dcmjs.d.ts ] ||npx dts-gen -m dcmjs"
  }
}
```

# dicom 파일 생성, 이미지 생성시 폴더 분리

- data/[uid]/dicom, data/[uid]/image 폴더를 생성해서 해당 경로에 파일 추가하기

# dicom tag db 저장

- dicom tag 별 기본 정보 저장: tag table
- mysql에 study의 dicom tag별 정보 저장: study table, patient table...
