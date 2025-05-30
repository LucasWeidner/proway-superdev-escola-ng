export class FormacaoCadastro {
    public duracao: Date 
    constructor(public nome: string ="", public descricao: string = "", ){
        const now = new Date();
    this.duracao = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
}
