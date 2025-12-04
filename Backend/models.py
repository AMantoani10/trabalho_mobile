from pydantic import BaseModel, EmailStr

class Pessoa(BaseModel):
    nome: str
    sobrenome: str
    idade: int
    telefone: str
    email: EmailStr
    cidade: str

class PessoaDB(Pessoa):
    id: str
