using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Backend.netcore.Models;

public class Produto {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string nome { get; set; } = null!;

    public string descricao { get; set; } = null!;

     public string link { get; set; } = null!;
}