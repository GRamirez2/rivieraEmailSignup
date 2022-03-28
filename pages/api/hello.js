// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const html = '<h1>Success</h1>'

export default function handler(req, res) {
  console.log('req.body.value', req.body.value)
  if(req.body.value === 'ken' && req.body.count < 4){
  res.status(200).json({ collector: html })
  }
}  

