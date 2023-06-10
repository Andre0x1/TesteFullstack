using System;
using Microsoft.AspNetCore.Mvc;
using Backend.netcore.Services;
using Backend.netcore.Models;

namespace Backend.netcore.Controllers; 

[Controller]
[Route("api/[controller]")]
public class ListaProdutoController: Controller {
    
    private readonly MongoDBService _mongoDBService;

    public ListaProdutoController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<ListaProduto>> Get() {
        return await _mongoDBService.GetListaProdutoAsync();
    }
    
    [HttpGet("{idLista}")]
    public async Task<List<ListaProduto>> GetbyList(string idLista) {
        return await _mongoDBService.GetListaProdutobyUserAsync(idLista);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ListaProduto ListaProduto) {
        await _mongoDBService.CreateAsync(ListaProduto);
        return CreatedAtAction(nameof(Get), new { id = ListaProduto.Id }, ListaProduto);
    }
}