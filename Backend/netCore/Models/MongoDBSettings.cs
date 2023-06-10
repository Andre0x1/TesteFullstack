namespace Backend.netcore.Models;

public class MongoDBSettings {

    public string ConnectionURI { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string CollectionProduto { get; set; } = null!;

    public string CollectionLista { get; set; } = null!;

    public string CollectionListaProdutos { get; set; } = null!;
}