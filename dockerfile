FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY ./bin/Release/net8.0/publish /app/

# Run section
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5443
EXPOSE 5443
ENTRYPOINT ["dotnet", "Dockland.dll"]