import { createResponse } from '../response-util';
import Mock from 'mockjs';

export default {
  'get|/api/dashboard/overviews': createResponse([
    {
      count: 18,
      total: 100,
    },
    {
      count: 27,
      total: 120,
    },
    {
      count: 180,
      total: 200,
    },
    {
      count: 10,
      total: 20,
    },
  ]),
  'get|/api/dashboard/simple-table-data': createResponse(
    Mock.mock({
      'data|10-12': [
        {
          name: '@string(5)',
          value: '@integer(1, 100)',
        },
      ],
    })['data']
  ),
  'get|/api/dashboard/line-chart-data': createResponse(
    Mock.mock({
      'data|5-10': [
        {
          name: '@string(5, 8)',
          value: '@integer(10, 100)',
        },
      ],
    })['data']
  ),
  'get|/api/dashboard/pie-chart-data': createResponse(
    Mock.mock({
      'data|5': [
        {
          name: '@string(4)',
          value: '@integer(5, 100)',
        },
      ],
    })['data']
  ),
  'get|/api/dashboard/scatter-chart-data': createResponse(
    Mock.mock({
      'data|20': [['@integer(1, 14)', '@integer(1, 14)']],
    })['data']
  ),
};
