import userService from "../services/userService.js";
import User from "../models/User.js";

const userController = {
    selecionar: async (req, res) => {
        try {
            const resultado = await userService.recuperarUsuarios();

            res.status(200).json({
                message: "Usuários recuperados com sucesso",
                data: resultado
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao recuperar usuários",
                error: error.message
            });
        }
    },
    selecionarPorId: async (req, res) => {
        const userId = Number(req.params.id);

        try {
            const usuario = await userService.recuperarUsuarioPorId(userId);

            if (!usuario) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            res.status(200).json({
                message: "Usuário recuperado com sucesso",
                data: usuario
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao recuperar usuário",
                error: error.message
            });
        }
    },
    deletar: async (req, res) => {
        const userId = Number(req.params.id);

        try {
            const resultado = await userService.removerUsuario(userId);

            if(resultado.affectedRows === 0) {
                throw new Error("Usuário não encontrado");
            }

            res.status(200).json({
                message: "Usuário removido com sucesso"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao remover usuário",
                error: error.message
            });
        }
    },
    criar: async (req, res) => {
        const { name, email, password } = req.body;

        const hashedPassword = await userService.hashedPassword(password);

        const user = new User(name, email, hashedPassword);

        try {
            // validação simples para garantir que name e email não estejam vazios
            if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
                return res.status(400).json({message: "Nome, email e senha são obrigatórios"});
            }

            const resultado = await userService.criarUsuario(user);

            res.status(201).json({message: "Usuário criado com sucesso", data: {id: resultado.insertId}});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro ao criar usuário", error: error.message});
        }
    },
    atualizar: async (req, res) => {
        const userId = Number(req.params.id);
        const { name, email, password } = req.body;

        const user = new User(name, email, password, userId);

        try {
            // validação simples para garantir que name e email não estejam vazios
            if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
                return res.status(400).json({message: "Nome, email e senha são obrigatórios"});
            }


            const resultado = await userService.atualizarUsuario(user);


            if (resultado.affectedRows === 0) {
                throw new Error("Usuário não encontrado");
            }


            res.status(200).json({
                message: "Usuário atualizado com sucesso"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro ao atualizar usuário",
                error: error.message
            });
        }
    }
};

export default userController;