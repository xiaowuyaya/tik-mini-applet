module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#6190E8',
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}