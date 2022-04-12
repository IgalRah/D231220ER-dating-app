using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetLikeAsync(AppUser user, AppUser likedUser);

        Task LoadUserLikesAsync(AppUser user);

        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);

        Task AddLikeAsync(UserLike like);
        Task DeleteLikeAsync(UserLike like);
    }
}