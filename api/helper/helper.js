const REQUIRED_KEYS = [ 'title', 'start_year', 'season_count' ]
const validate = (req, res, next) => {

  const error = { status: 400, message: 'Missing request body!' }


  const {title, start_year, season_count} = req.body
  if(!title) next({ status: 400, message: 'title missing!' })
  if(!start_year) next({ status: 400, message: 'season_count missing!' })
  if(!season_count) next({ status: 400, message: 'season_count missing!' })


  // if (!req.body) next(error)
  //
  // const hasAllKeys = REQUIRED_KEYS.every(key => req.body[key])
  // if (!hasAllKeys) next(error)
  //
  // const noExtraKeys = Object.keys(req.body).every(key => REQUIRED_KEYS.includes(key))
  // if (!noExtraKeys) next(error)

  next()
}

module.exports = { validate }
