using System;
using System.Security.Authentication;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using infraestructure.DataModels;
using infraestructure.Repositories;
using Microsoft.Extensions.Logging;
using Konscious.Security.Cryptography;
using service;

public class AuthenticationService : PasswordHashAlgorithm
{
    private readonly UserRepository _userRepository;
    private readonly ILogger<AuthenticationService> _logger;

    public AuthenticationService(UserRepository userRepository, ILogger<AuthenticationService> logger)
    {
        this._userRepository = userRepository;
        _logger = logger;
    }

    public User? AuthenticateUser(string username, string password)
    {
        try
        {
            var user = _userRepository.GetUserByUsername(username);


            if (user != null)
            {
                string hashedPassword = HashPassword(password, user.PasswordSalt);

                if (hashedPassword == user.PasswordHash)
                {
                    Console.WriteLine(hashedPassword);
                    return user;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        // Authentication failed
        throw new InvalidCredentialException("sad trumpet sound");
    }


    public async Task RegisterUserAsync(string username, string password)
    {
        var salt = Convert.ToBase64String(GenerateSalt());
        var hashedPassword = HashPassword(password, salt);
     
        _userRepository.CreateUser(username, hashedPassword, salt, "user");
    }

    private byte[] GenerateSalt()
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            var salt = new byte[32];
            rng.GetBytes(salt);
            return salt;
        }
    }

    /*public static string HashPassword(string password, string salt)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
        byte[] combined = new byte[saltBytes.Length + passwordBytes.Length];

        Buffer.BlockCopy(saltBytes, 0, combined, 0, saltBytes.Length);
        Buffer.BlockCopy(passwordBytes, 0, combined, saltBytes.Length, passwordBytes.Length);

        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(combined);
            return Convert.ToBase64String(hashedBytes);
        }
    }*/
    
    public override string HashPassword(string password, string salt)
    {
        using var hashAlgo = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = Decode(salt),
            MemorySize = 12288,
            Iterations = 3,
            DegreeOfParallelism = 1,
        };
        return Encode(hashAlgo.GetBytes(128));
    }
    
    public override bool VerifyHashedPassword(string email, string password, string hash, string salt)
    {
        return HashPassword(password, salt).SequenceEqual(hash);
    }
    
    public User? Get (SessionData data)
    {
        return _userRepository.GetUserById(data.UserId);
    }
    
}
