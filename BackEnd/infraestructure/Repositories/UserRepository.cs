using infraestructure.DataModels;
using Npgsql;
namespace infraestructure;
using Dapper;

public class UserRepository

{  private NpgsqlDataSource _dataSource;

    public UserRepository(NpgsqlDataSource datasource)
    {
        _dataSource = datasource;
    }

    public IEnumerable<UserQuery> GetUserFeed()
    {
        string sql = $@"
SELECT UserId as {nameof(UserQuery.UserId)},
       Username as {nameof(UserQuery.Username)},
        PasswordHash as {nameof(UserQuery.PasswordHash)},
        PasswordSalt as {nameof(UserQuery.PasswordSalt)},
        Role as {nameof(UserQuery.Role)}
FROM ExamProject.Users;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<UserQuery>(sql);
        }
    }
    public User CreateUser(string username, string passwordHash, byte[] passwordSalt, string role)
    {
        var sql = $@"
INSERT INTO ExamProject.Users (Username, PasswordHash, PasswordSalt, Role) 
VALUES (@Username, @PasswordHash, @PasswordSalt, @Role)
RETURNING UserId as {nameof(UserQuery.UserId)},
       Username as {nameof(UserQuery.Username)},
       PasswordHash as {nameof(UserQuery.PasswordHash)},
        PasswordSalt as {nameof(UserQuery.PasswordSalt)},
        Role as {nameof(UserQuery.Role)},
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new {username, passwordHash, passwordSalt, role });
        }
    }
    
    
    public bool DeleteUser(int userId)
    {
        var sql = @"DELETE FROM ExamProject.Users WHERE UserId = @UserId;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Execute(sql, new { userId }) == 1;
        }
    }
    
    public User UpdateUser(string username, int userId, string passwordHash, string passwordSalt, string role)
    {
        var sql = $@"
UPDATE ExamProject.Users SET Username = @Username, PasswordHash = @PasswordHash, PasswordSalt= @PasswordSalt, Role = @Role
WHERE UserId = @UserId
RETURNING UserId as {nameof(UserQuery.UserId)},
       Username as {nameof(UserQuery.Username)},
       PasswordHash as {nameof(UserQuery.PasswordHash)},
        PasswordSalt as {nameof(UserQuery.PasswordSalt)},
        Role as {nameof(UserQuery.Role)}
FROM ExamProject.Users;";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<User>(sql, new { username, userId, passwordHash, passwordSalt, role});
        }
    }
    
    public async Task<UserQuery> GetUserByUsernameAsync(string username)
    {
        string sql = $@"
SELECT UserId as {nameof(UserQuery.UserId)},
       Username as {nameof(UserQuery.Username)},
       PasswordHash as {nameof(UserQuery.PasswordHash)},
       PasswordSalt as {nameof(UserQuery.PasswordSalt)},
       Role as {nameof(UserQuery.Role)}
FROM ExamProject.Users
WHERE Username = @Username;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return await conn.QueryFirstOrDefaultAsync<UserQuery>(sql, new { Username = username });
        }
    }
}