import userRepository from "../repositories/userRepository.js";

const userService = {
    recuperarUsuarios: async () => {
        try {
            const resultado = await userRepository.selecionar();
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao recuperar usuários: " + error.message)
        };
    },
    recuperarUsuariosPorId: async (userId) => {
        try {
            const resultado = await userRepository.selecionarPorId();
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao recuperar usuários: " + error.message)
        };
    },
    recuperarUsuariosPorEmail: async (email) => {
        try {
            const resultado = await userRepository.selecionarPorEmail();
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao recuperar usuários: " + error.message)
        };
    },
    removerUsuario: async (userId) => {
        try {
            const resultado = await userRepository.deletar(userId);
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar usuários: " + error.message)
        };
    },
     criarUsuario: async (user) => {
        try {
            const resultado = await userRepository.criar(user.name, user.email, user.password);
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar usuários: " + error.message)
        };
    },
    atualizarUsuario: async (user) => {
        try {
            const resultado = await userRepository.atualizar(user.id, user.name, user.email, user.password);
            return resultado;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao atualizar usuários: " + error.message)
        };
    },
};

export default userService;