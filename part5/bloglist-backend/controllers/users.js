const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {

  try{
    const body = request.body

    const saltRounds = 10
    if(body.password.length < 3){
      return response.status(400).json({ error: 'Password introduced has less than 3 characters' })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }catch(error){
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title:1, author:1 })
  response.json(users)
})

module.exports = usersRouter