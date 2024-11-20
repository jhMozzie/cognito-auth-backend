import { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

export const signUp = async (req, res) => {
  const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const { username, password, email } = req.body;
  try {
    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }],
    });
    const response = await cognitoClient.send(command);
    res.status(200).json({ message: 'User registered', response });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

export const confirmSignUp = async (req, res) => {
  const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const { username, confirmationCode } = req.body;
  try {
    const command = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      ConfirmationCode: confirmationCode,
    });
    await cognitoClient.send(command);
    res.status(200).json({ message: 'User confirmed' });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// login
export const login = async (req, res) => {
    const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
      });

    const {username, password} = req.body
    try{
        const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password
            }
        })
        const response = await cognitoClient.send(command);
        res.status(200).json({message: 'User authenticated', token: response.AuthenticationResult})
    }catch(err){
        res.status(400).json({err: err.message})
    }
}
   