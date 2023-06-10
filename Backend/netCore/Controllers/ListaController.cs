using System;
using Microsoft.AspNetCore.Mvc;
using Backend.netcore.Services;
using Backend.netcore.Models;

namespace Backend.netcore.Controllers; 

[Controller]
[Route("api/[controller]")]
public class ListaController: Controller {
    
    private readonly MongoDBService _mongoDBService;

    public ListaController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<Lista>> Get() {
        return await _mongoDBService.GetListaAsync();
    }

    [HttpGet("{idUsuario}")]
    public async Task<List<Lista>> GetbyUser(string idUsuario ) {
        return await _mongoDBService.GetListaUserAsync(idUsuario);
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Lista Lista) {
        await _mongoDBService.CreateAsync(Lista);
        return CreatedAtAction(nameof(Get), new { id = Lista.Id }, Lista);
    }
}