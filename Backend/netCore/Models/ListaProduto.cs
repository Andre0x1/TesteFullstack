using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Backend.netcore.Models;

public class ListaProduto {


    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string  Id { get; set; } = null!;

    public string idLista { get; set; } = null!;

    public string idProduto { get; set; } = null!;

}