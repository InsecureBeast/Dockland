# Setup section
# Get the base image of Node version 16
FROM node:16-buster-slim as node-env

# Get dotnet sdk
FROM mcr.microsoft.com/dotnet/sdk:6.0  as build-env
# Copy node to dotnet sdk image
COPY --from=node-env / /
# Copy source from git to dotnet sdk image
COPY / /app

# Build Section
# Error couldn't find a valid ICU
# https://stackoverflow.com/questions/72536918/net6-and-docker-couldnt-find-a-valid-icu-package-installed-on-the-system
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

# Set the work directory for the application
WORKDIR /app

# restore nuget
RUN dotnet restore

# RUN dotnet publish -c Release -o /publish
# RUN npm config set https-proxy http://user:pwd@ip:3128
# RUN export https_proxy=http://user:pwd@ip:3128
RUN dotnet publish ./DockerW.csproj /p:PublishProfile=./Properties/PublishProfiles/Linux-x64.pubxm /p:Configuration=Release

# Run section
ENV ASPNETCORE_URLS=http://+:5443
EXPOSE 5443
ENTRYPOINT ["dotnet", "/bin/Release/net6.0/publish/linux-x64/DockerW.dll"]