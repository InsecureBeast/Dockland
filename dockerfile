FROM mcr.microsoft.com/dotnet/aspnet:7.0
COPY ./bin/Release/net7.0/publish/linux-x64 /app/

# Run section
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5443
EXPOSE 5443
ENTRYPOINT ["dotnet", "Dockland.dll"]