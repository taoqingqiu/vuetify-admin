import Mock from 'mockjs';

// setup
Mock.setup({ timeout: '200-1000' });

// register modules
const moduleFiles = require.context('./modules', true, /.*\.js$/);
moduleFiles.keys().forEach(k => {
  Object.entries(moduleFiles(k).default).forEach(([key, value]) => {
    const [type, url] = key.split('|');
    Mock.mock(new RegExp('^' + url + '\\b'), type, value); // \b 添加元字符串，可用于区分匹配单复数
  });
});
