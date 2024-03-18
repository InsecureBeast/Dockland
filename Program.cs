using Dockland.Middleware;
using Dockland.Model;
using Dockland.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var databaseService = new LiteDatabaseService(DirectoryProvider.DatabaseFolder);
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IDatabaseService>(databaseService);
builder.Services.AddSingleton<IStackDatabaseService>(databaseService);
builder.Services.AddSingleton<IDockerService, DockerService>();
builder.Services.AddSingleton<IGitService, GitService>();
builder.Services.AddSingleton<IStackEditorService, StackEditorService>();

var app = builder.Build();

app.UseExceptionHandlerMiddleware();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html"); ;
app.UseApplicationInitialization();

app.Run();
