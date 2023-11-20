﻿namespace infraestructure;

public class UserQuery
{
    public int UserId { get; set; }
    public string Username { get; set; }
    
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; }
}