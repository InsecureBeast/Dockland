using Docker.DotNet.Models;
using DockerW.DataModels;
using DockerW.Services;

namespace DockerW.Utils
{
    public class ImagesUtils
    {
    }

    public static class ImagesExtensions
    {
        public static Task<IList<ImagesListResponse>> GetImagesAsync(this IDockerService service, string env)
        {
            var client = service.GetService(env);
            if (client == null)
                return Task.FromResult(new List<ImagesListResponse>() as IList<ImagesListResponse>);

            var parameters = new ImagesListParameters
            {
                All = true,
                Digests = true
            };
            //parameters.Filters = new Dictionary<string, IDictionary<string, bool>>
            //{
            //    ["label"] = new Dictionary<string, bool>
            //    {
            //        [DockerComposeLabels.SERVICE] = true
            //    }
            //};

            return client.Images.ListImagesAsync(parameters);
        }

        public static IEnumerable<ImagesListResponse> FilterImagesAsync(this IList<ImagesListResponse> list, string? stack)
        {
            if (list == null)
                return Enumerable.Empty<ImagesListResponse>();

            if (string.IsNullOrEmpty(stack))
                return list;

            var imagesList = list.Where(c => c.Labels != null && c.Labels.ContainsKey(DockerComposeLabels.PROJECT));
            return imagesList.Where(c => c.Labels[DockerComposeLabels.PROJECT] == stack);
        }
    }
}
