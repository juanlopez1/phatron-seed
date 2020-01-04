module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '85',
          electron: '10'
        }
      }
    ]
  ],
  plugins: [
    '@babel/proposal-optional-chaining'
  ]
};
