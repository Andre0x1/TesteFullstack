using Backend.netcore.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Backend.netcore.Services;

public class MongoDBService {

    private readonly IMongoCollection<Produto> _CollectionProduto;
    private readonly IMongoCollection<Lista> _CollectionLista;

    private readonly IMongoCollection<ListaProduto> _CollectionListaProduto;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _CollectionProduto = database.GetCollection<Produto>(mongoDBSettings.Value.CollectionProduto);
        _CollectionLista = database.GetCollection<Lista>(mongoDBSettings.Value.CollectionLista);
        _CollectionListaProduto = database.GetCollection<ListaProduto>(mongoDBSettings.Value.CollectionListaProdutos);
    }

    public async Task<List<Produto>> GetProdutoAsync() { 
        return await _CollectionProduto.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<Produto> GetProdutoByIdAsync(string id)
    {
        var filter = Builders<Produto>.Filter.Eq("_id",  ObjectId.Parse(id));
        var produto = await _CollectionProduto.Find(filter).FirstOrDefaultAsync();
        return produto;
    }

    public async Task CreateAsync(Produto Produto) { 
        await _CollectionProduto.InsertOneAsync(Produto);
        return;
    }

     public async Task<List<Lista>> GetListaAsync() { 
        return await _CollectionLista.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<List<Lista>> GetListaUserAsync(string idUsuario)
    {
        var filter = Builders<Lista>.Filter.Eq("idUsuario", idUsuario);
        var listas = await _CollectionLista.Find(filter).ToListAsync();
        return listas;
    }

    public async Task CreateAsync(Lista Lista) { 
        await _CollectionLista.InsertOneAsync(Lista);
        return;
    }

     public async Task<List<ListaProduto>> GetListaProdutoAsync() { 
        return await _CollectionListaProduto.Find(new BsonDocument()).ToListAsync();
    }


    public async Task<List<ListaProduto>> GetListaProdutobyUserAsync(string idLista)
    {
    var filter = Builders<ListaProduto>.Filter.Eq("idLista", idLista);
    var produtos = await _CollectionListaProduto.Find(filter).ToListAsync();
    return produtos;
    }

    public async Task CreateAsync(ListaProduto ListaProduto) { 
        await _CollectionListaProduto.InsertOneAsync(ListaProduto);
        return;
    }
}