using Dockland.Model;
using Dockland.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IDatabaseService>(new LiteDatabaseService("D:\\temp"));
builder.Services.AddSingleton<IDockerService, DockerService>();
builder.Services.AddScoped<IGitService, GitService>();

var app = builder.Build();

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
