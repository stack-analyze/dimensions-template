const { createApp } = require('vue')
const App = require('./App')
const router = require('./router')

const app = createApp(App)

app.use(router)
app.mount('body')
