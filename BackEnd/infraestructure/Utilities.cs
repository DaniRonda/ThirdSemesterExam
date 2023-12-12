namespace infraestructure;

public class Utilities
{
    private static readonly Uri Uri = new Uri("postgres://almjqoud:HuvyO55uUCMnnDgz8m73g4JbIq2NWpWu@cornelius.db.elephantsql.com/almjqoud");
    
    public static readonly string 
        ProperlyFormattedConectionString = string.Format(
            "Server={0};Database={1};User Id={2};Password={3};Port={4};Pooling=false;",
            Uri.Host,
            Uri.AbsolutePath.Trim('/'),
            Uri.UserInfo.Split(':')[0],
            Uri.UserInfo.Split(':')[1],
            Uri.Port > 0 ? Uri.Port : 5432);
}