// vue-router modules
const { createRouter, createWebHashHistory } = require('vue-router')

const history = createWebHashHistory(location.hash)

// routes
const routes = [
  {
    path: '/', 
    component: require('./pages/Home'),
  },
]

// router instance
const router = createRouter({
  history, routes
})

module.exports = router
