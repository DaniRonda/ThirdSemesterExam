﻿namespace infraestructure.DataModels;

public class User
{
    
    public int UserId { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public string Role { get; set; }
}
