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
  await queryInterface.bulkUpdate(
    'User',
    {
      name: '이이동규',
    },
    { name: '이동규' }
  );
};

/** 시더 롤백 */
export const down = async (queryInterface: QueryInterface) => {
  // 예시: 모든 더미 데이터 제거
  await queryInterface.bulkUpdate(
    'User',
    {
      name: '이동규',
    },
    { name: '이이동규' }
  );
};
