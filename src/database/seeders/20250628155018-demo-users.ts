import {
  QueryInterface,
  // , Sequelize
} from 'sequelize';

/** 시더 실행 */
export const up = async (
  queryInterface: QueryInterface
  // sequelize: typeof Sequelize
) => {
  // 예시: 더미 데이터 삽입
  await queryInterface.bulkInsert('User', [
    { name: '이동규' },
    { name: '이다은' },
    { name: '이교일' },
    { name: '김금녀' },
  ]);
};

/** 시더 롤백 */
export const down = async (queryInterface: QueryInterface) => {
  // 예시: 모든 더미 데이터 제거
  await queryInterface.bulkDelete('User', {});
};
