import express from 'express';
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

const homeRoutes = express.Router()

const authenticateToken = async(req, res , next) => {
  const token = req.headers['authorization']
  if (!token) return res.sendStatus(401)
  
  const accessToken = token.split(' ')[1]
  const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials:{
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
  })

  try{
    const command = new GetUserCommand({AccessToken: accessToken})
    const user = await cognitoClient.send(command)
    req.user = user
    next()
  }catch(err){
    res.status(403).json({err: "Invalid token"})
  }

}

homeRoutes.get('/home', authenticateToken, (req, res) => {
  res.json({message: "Bienvenido al Home, estas autenticado.", user: req.user});
});

export default homeRoutes;