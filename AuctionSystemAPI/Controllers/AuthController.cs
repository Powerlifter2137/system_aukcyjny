using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AuctionSystemAPI.Models;
using AuctionSystemAPI.Services;


[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto request)
    {
        var user = new User { Username = request.Username, Email = request.Email };
        await _authService.Register(user, request.Password);
        return Ok("Zarejestrowano pomyślnie");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto request)
    {
        var token = await _authService.Login(request.Username, request.Password);
        if (token == null) return Unauthorized("Błędne dane logowania");

        return Ok(new { token });
    }
}

public class UserDto
{
    public string Username { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

