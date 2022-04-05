// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const signup = "http://eepurl.com/hYbqwT"

export default function handler(req, res) {
  // console.log('req.body.value', req.body.value)
  if(req.body.value === 'ken' && req.body.count < 4){
  res.status(200).json({ collector: signup })
  } else res.status(200).json({score: 1})
}  


