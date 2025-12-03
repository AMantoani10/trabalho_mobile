from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from models import Pessoa, PessoaDB
from fastapi.middleware.cors import CORSMiddleware

# Conexão MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["cadastrodb"]
collection = db["pessoas"]

app = FastAPI()

# Liberar CORS para o Ionic
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Converter documento Mongo → PessoaDB
def to_pessoa_db(doc) -> PessoaDB:
    return PessoaDB(
        id=str(doc["_id"]),
        nome=doc["nome"],
        sobrenome=doc["sobrenome"],
        idade=doc["idade"],
        telefone=doc["telefone"],
        email=doc["email"],
        cidade=doc["cidade"]
    )

# ROOT
@app.get("/")
def root():
    return {"msg": "API de Pessoas funcionando!"}

# LISTAR
@app.get("/pessoas", response_model=list[PessoaDB])
def listar():
    docs = collection.find().sort("_id", -1)
    return [to_pessoa_db(doc) for doc in docs]

# BUSCAR 1
@app.get("/pessoas/{id}", response_model=PessoaDB)
def buscar(id: str):
    doc = collection.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(404, "Pessoa não encontrada")
    return to_pessoa_db(doc)

# CRIAR
@app.post("/pessoas", response_model=PessoaDB)
def criar(pessoa: Pessoa):
    result = collection.insert_one(pessoa.dict())
    new_doc = collection.find_one({"_id": result.inserted_id})
    return to_pessoa_db(new_doc)

# ATUALIZAR
@app.put("/pessoas/{id}", response_model=PessoaDB)
def atualizar(id: str, pessoa: Pessoa):
    result = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": pessoa.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Pessoa não encontrada")

    doc = collection.find_one({"_id": ObjectId(id)})
    return to_pessoa_db(doc)

# DELETAR
@app.delete("/pessoas/{id}")
def excluir(id: str):
    result = collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Pessoa não encontrada")
    return {"success": True}
