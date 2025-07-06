'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

import { VR } from '@/constant/dicom-message';

export const up = async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
  await queryInterface.createTable('DICOM_MESSAGE', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    study_uid: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: dataTypes.STRING(8),
      allowNull: false,
    },
    vr: {
      type: dataTypes.ENUM(...VR),
      validate: { len: [8, 8] }, // 최소·최대 길이
      allowNull: false,
    },
    value: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    raw_value: {
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      allowNull: false,
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
    },
  });
};
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('DICOM_MESSAGE');
};
