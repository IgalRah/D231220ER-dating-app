using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await  _context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            IQueryable<AppUser> users;
            var likes = _context.Likes.AsQueryable();

            if(predicate == "liked"){
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(likes => likes.LikedUser);
            }else{
                likes = likes.Where(like => like.LikedUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(user => new LikeDto {
                Age = user.DateOfBirth.CalculateAge(),
                Country = user.Country,
                City = user.City,
                Id = user.Id,
                KnownAs = user.KnownAs,
                PhotoUser = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                Username = user.UserName
            }).ToListAsync();

        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(u => u.LikedUsers)
            .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}