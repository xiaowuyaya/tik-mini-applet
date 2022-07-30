module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#6190E8',
          placeholder: '#303133',
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}