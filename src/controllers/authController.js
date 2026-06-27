import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userService from '../services/userService.js';


const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;


            const userExists = await userService.recuperarUsuariosPorEmail(
                email.trim()
            )


            if(!userExists || userExists.length === 0){
                return res.status(401).json({ message: 'Usuário não encontrado' })
            }
            const validPassword = await bcrypt.compare(password, userExists[0].password);


            if(!validPassword){
                return res.status(401).json({
                    message: "Senha inválida!!!"
                })
            }


            const accessToken = jwt.sign(
                {id: userExists[0].id, email: userExists[0].email, name: userExists[0].name}, process.env.JWT_SECRET,{expiresIn: '3m'});

            res.status(200).json({message: 'Login realizado com sucesso!', token: accessToken});
           
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        };
    }
};

export default authController;