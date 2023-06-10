using System;
using Microsoft.AspNetCore.Mvc;
using Backend.netcore.Services;
using Backend.netcore.Models;

namespace Backend.netcore.Controllers; 

[Controller]
[Route("api/[controller]")]
public class ProdutoController: Controller {
    
    private readonly MongoDBService _mongoDBService;

    public ProdutoController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<Produto>> Get() {
        return await _mongoDBService.GetProdutoAsync();
    }

    [HttpGet("{produtoId}")]
    public async Task<Produto> Getbyid(string produtoId ) {
        return await _mongoDBService.GetProdutoByIdAsync(produtoId);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Produto Produto) {
        await _mongoDBService.CreateAsync(Produto);
        return CreatedAtAction(nameof(Get), new { id = Produto.Id }, Produto);
    }
}